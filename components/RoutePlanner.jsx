"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import styles from "./RoutePlanner.module.css";

const STORAGE_KEY = "bb_route_planner_v1";
const STORAGE_SAVED = "bb_route_planner_saved_v1";

function normalizeStop(s) {
  return (s || "").trim().replace(/\s+/g, " ");
}

function buildGoogleMapsDirectionsUrl(start, waypoints, end) {
  const s = normalizeStop(start);
  const e = normalizeStop(end);
  const mids = (waypoints || []).map(normalizeStop).filter(Boolean);

  if (!s || !e) return "";

  const all = [s, ...mids, e];
  const segments = all.map((x) => encodeURIComponent(x)).join("/");
  return `https://www.google.com/maps/dir/${segments}`;
}

function encodeRoute({ start, end, stops }) {
  const payload = {
    s: normalizeStop(start),
    e: normalizeStop(end),
    w: (stops || []).map(normalizeStop).filter(Boolean),
  };

  return encodeURIComponent(JSON.stringify(payload));
}

function decodeRoute(routeParam) {
  try {
    const raw = decodeURIComponent(routeParam || "");
    const parsed = JSON.parse(raw);

    const start = normalizeStop(parsed?.s || "");
    const end = normalizeStop(parsed?.e || "");
    const stops = Array.isArray(parsed?.w)
      ? parsed.w.map(normalizeStop).filter(Boolean)
      : [];

    return { start, end, stops };
  } catch {
    return null;
  }
}

function safeReadJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeWriteJSON(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function RoutePlanner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  const [mapError, setMapError] = useState("");
  const [mapStatus, setMapStatus] = useState(
    "Enter a start and end to preview the route."
  );

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [newStop, setNewStop] = useState("");
  const [stops, setStops] = useState([]);

  const [tripName, setTripName] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState("");

  const directionsUrl = useMemo(
    () => buildGoogleMapsDirectionsUrl(start, stops, end),
    [start, stops, end]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        setMapError("Missing Google Maps API key.");
        return;
      }

      try {
        setOptions({
          key: apiKey,
          version: "weekly",
        });

        const { Map } = await importLibrary("maps");
        const { DirectionsService, DirectionsRenderer } =
          await importLibrary("routes");

        if (cancelled || !mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: { lat: 39.5501, lng: -105.7821 },
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        const renderer = new DirectionsRenderer({
          map,
          suppressMarkers: false,
        });

        mapInstanceRef.current = map;
        directionsRendererRef.current = renderer;

        const s = normalizeStop(start);
        const e = normalizeStop(end);
        const w = (stops || []).map(normalizeStop).filter(Boolean);

        if (!s || !e) {
          setMapStatus("Enter a start and end to preview the route.");
          return;
        }

        setMapStatus("Loading route preview…");

        const service = new DirectionsService();

        service.route(
          {
            origin: s,
            destination: e,
            waypoints: w.map((stop) => ({
              location: stop,
              stopover: true,
            })),
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (cancelled) return;

            if (status === "OK" && result) {
              renderer.setDirections(result);
              setMapStatus("Route preview loaded.");
              setMapError("");
            } else {
  setMapStatus(`Route preview failed: ${status}`);
            }
          }
        );
      } catch (error) {
        console.error(error);
        setMapError("Google Map failed to load.");
      }
    }

    loadMap();

    return () => {
      cancelled = true;
    };
  }, [start, end, stops]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const list = safeReadJSON(STORAGE_SAVED, []);
    setSavedTrips(Array.isArray(list) ? list : []);

    const r = searchParams.get("r");

    if (r) {
      const decoded = decodeRoute(r);

      if (decoded) {
        setStart(decoded.start);
        setEnd(decoded.end);
        setStops(decoded.stops);
        setNewStop("");

        try {
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              s: decoded.start,
              e: decoded.end,
              w: decoded.stops,
            })
          );
        } catch {}
      }

      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      const s = normalizeStop(parsed?.s || "");
      const e = normalizeStop(parsed?.e || "");
      const w = Array.isArray(parsed?.w)
        ? parsed.w.map(normalizeStop).filter(Boolean)
        : [];

      if (s || e || w.length) {
        setStart(s);
        setEnd(e);
        setStops(w);
        setNewStop("");
      }
    } catch {}
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            s: normalizeStop(start),
            e: normalizeStop(end),
            w: (stops || []).map(normalizeStop).filter(Boolean),
          })
        );
      } catch {}
    }, 300);

    return () => window.clearTimeout(t);
  }, [start, end, stops]);

  const canAdd = normalizeStop(newStop).length > 0;

  function addStop() {
    const s = normalizeStop(newStop);
    if (!s) return;

    setStops((prev) => [...prev, s]);
    setNewStop("");
  }

  function removeStop(i) {
    setStops((prev) => prev.filter((_, idx) => idx !== i));
  }

  function moveStop(i, dir) {
    setStops((prev) => {
      const next = [...prev];
      const j = i + dir;

      if (j < 0 || j >= next.length) return prev;

      [next[i], next[j]] = [next[j], next[i]];

      return next;
    });
  }

  function swapStartEnd() {
    const s = start;
    const e = end;

    setStart(e);
    setEnd(s);
  }

  function clearAll() {
    setStart("");
    setEnd("");
    setStops([]);
    setNewStop("");
    setTripName("");
    setSelectedTripId("");
    setMapStatus("Enter a start and end to preview the route.");

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] });
    }

    router.replace(pathname, { scroll: false });

    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }

  function saveTrip() {
    const name = normalizeStop(tripName);
    const s = normalizeStop(start);
    const e = normalizeStop(end);
    const w = (stops || []).map(normalizeStop).filter(Boolean);

    if (!name) return alert("Trip name is required.");
    if (!s || !e) return alert("Start and End are required.");

    const now = Date.now();

    const existingIndex = savedTrips.findIndex(
      (t) => (t?.name || "").trim().toLowerCase() === name.toLowerCase()
    );

    let next;

    if (existingIndex >= 0) {
      const existing = savedTrips[existingIndex];

      const updated = {
        ...existing,
        name,
        route: { start: s, end: e, stops: w },
        updatedAt: now,
      };

      next = [updated, ...savedTrips.filter((_, i) => i !== existingIndex)];
      setSelectedTripId(updated.id);
      alert("Updated.");
    } else {
      const item = {
        id: makeId(),
        name,
        route: { start: s, end: e, stops: w },
        updatedAt: now,
      };

      next = [item, ...savedTrips];
      setSelectedTripId(item.id);
      alert("Saved.");
    }

    next = next.slice(0, 50);
    setSavedTrips(next);
    safeWriteJSON(STORAGE_SAVED, next);
  }

  function loadTrip(id) {
    const item = savedTrips.find((x) => x.id === id);
    if (!item) return;

    setStart(item.route.start || "");
    setEnd(item.route.end || "");
    setStops(Array.isArray(item.route.stops) ? item.route.stops : []);
    setNewStop("");
    setSelectedTripId(id);
    setTripName(item.name || "");

    router.replace(pathname, { scroll: false });
  }

  function deleteTrip(id) {
    const next = savedTrips.filter((x) => x.id !== id);

    setSavedTrips(next);
    safeWriteJSON(STORAGE_SAVED, next);

    if (selectedTripId === id) setSelectedTripId("");
  }

  async function copyGoogleMapsLink() {
    if (!directionsUrl) return;

    try {
      await navigator.clipboard.writeText(directionsUrl);
      alert("Copied Google Maps link.");
    } catch {
      prompt("Copy this link:", directionsUrl);
    }
  }

  async function copyShareUrl() {
    const r = encodeRoute({ start, end, stops });
    const url = `${window.location.origin}${pathname}?r=${r}`;

    router.replace(`${pathname}?r=${r}`, { scroll: false });

    try {
      await navigator.clipboard.writeText(url);
      alert("Copied share URL.");
    } catch {
      prompt("Copy this share URL:", url);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Route Planner</h1>
        <p className={styles.sub}>
          Set your start and end, add optional stops, then open it in Google Maps.
        </p>

        <div className={styles.saveRow}>
          <input
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Trip name (e.g., Aspen Run)…"
            className={styles.input}
          />

          <button onClick={saveTrip} className={styles.btn} type="button">
            Save Trip
          </button>

          <select
            className={styles.select}
            value={selectedTripId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedTripId(id);
              if (id) loadTrip(id);
            }}
          >
            <option value="">Load a saved trip…</option>
            {savedTrips.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (!selectedTripId) return;
              if (confirm("Delete this saved trip?")) deleteTrip(selectedTripId);
            }}
            disabled={!selectedTripId}
            className={styles.btn}
            type="button"
          >
            Delete
          </button>
        </div>

        <div className={styles.startEndRow}>
          <div className={styles.field}>
            <div className={styles.label}>Start</div>
            <input
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Start location…"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>End</div>
            <input
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="End location…"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.addRow}>
          <input
            value={newStop}
            onChange={(e) => setNewStop(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addStop();
            }}
            placeholder="Optional stop (address, town, landmark)…"
            className={styles.input}
          />

          <button
            onClick={addStop}
            disabled={!canAdd}
            className={styles.btn}
            type="button"
          >
            Add stop
          </button>
        </div>

        <div className={styles.mapBlock}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Map Preview</h2>
            <div className={styles.count}>{mapError || mapStatus}</div>
          </div>

          <div className={styles.mapShell}>
            {mapError ? (
              <div className={styles.mapFallback}>{mapError}</div>
            ) : (
              <div
                ref={mapRef}
                className={styles.map}
                aria-label="Route map preview"
              />
            )}
          </div>
        </div>

        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Stops</h2>
          <div className={styles.count}>{stops.length} total</div>
        </div>

        <div className={styles.list}>
          {stops.map((s, i) => (
            <div key={`${s}-${i}`} className={styles.item}>
              <div>
                <div className={styles.meta}>{`Stop ${i + 1}`}</div>
                <div className={styles.stopText}>{s}</div>
              </div>

              <div className={styles.itemActions}>
                <button
                  onClick={() => moveStop(i, -1)}
                  disabled={i === 0}
                  className={styles.smallBtn}
                  type="button"
                >
                  ↑
                </button>

                <button
                  onClick={() => moveStop(i, 1)}
                  disabled={i === stops.length - 1}
                  className={styles.smallBtn}
                  type="button"
                >
                  ↓
                </button>

                <button
                  onClick={() => removeStop(i)}
                  className={styles.smallBtn}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footerActions}>
          <div className={styles.footerLeft}>
            <button onClick={swapStartEnd} className={styles.smallBtn} type="button">
              Swap Start/End
            </button>

            <button onClick={clearAll} className={styles.smallBtn} type="button">
              Clear
            </button>
          </div>

          <a
            href={directionsUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className={`${styles.primaryLink} ${
              !directionsUrl ? styles.primaryLinkDisabled : ""
            }`}
          >
            Open in Google Maps
          </a>

          <button
            onClick={copyGoogleMapsLink}
            disabled={!directionsUrl}
            className={styles.btn}
            type="button"
          >
            Copy Google Maps link
          </button>

          <button onClick={copyShareUrl} className={styles.btn} type="button">
            Copy share URL
          </button>

          <div className={styles.tip}>
            Autosaves locally. Share URL reloads your route.
          </div>
        </div>
      </div>
    </div>
  );
}