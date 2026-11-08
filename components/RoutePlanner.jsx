"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import styles from "./RoutePlanner.module.css";
import { trackRouteEvent } from "../lib/analytics";

if (typeof window !== "undefined" && !window.__bbGoogleMapsConfigured) {
  setOptions({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  window.__bbGoogleMapsConfigured = true;
}

const STORAGE_KEY = "bb_route_planner_v1";
const STORAGE_SAVED = "bb_route_planner_saved_v1";

function normalizeStop(s) {
  return (s || "").trim().replace(/\s+/g, " ");
}

function buildGoogleMapsDirectionsUrl(start, waypoints, end, routeStyle) {
  const s = normalizeStop(start);
  const e = normalizeStop(end);
  const mids = (waypoints || []).map(normalizeStop).filter(Boolean);

  if (!s || !e) return "";

  const params = new URLSearchParams({
    api: "1",
    origin: s,
    destination: e,
    travelmode: "driving",
  });

  if (mids.length) {
    params.set("waypoints", mids.join("|"));
  }

  if (routeStyle === "backroads") {
    params.set("avoid", "highways,tolls");
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
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
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function isNearRoute(location, path, maxMiles = 10) {
  if (!location || !path || path.length < 2) return false;

  const getLat = (point) =>
    typeof point.lat === "function" ? point.lat() : point.lat;

  const getLng = (point) =>
    typeof point.lng === "function" ? point.lng() : point.lng;

  const radians = Math.PI / 180;
  const earthMiles = 3958.8;

  const latitude = getLat(location);
  const longitude = getLng(location);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  const longitudeScale = Math.cos(latitude * radians);

  function project(point) {
    const pointLat = getLat(point);
    const pointLng = getLng(point);

    const longitudeDifference =
      ((pointLng - longitude + 540) % 360) - 180;

    return {
      x: longitudeDifference * radians * earthMiles * longitudeScale,
      y: (pointLat - latitude) * radians * earthMiles,
    };
  }

  for (let i = 1; i < path.length; i++) {
    const a = project(path[i - 1]);
    const b = project(path[i]);

    if (
      !Number.isFinite(a.x) ||
      !Number.isFinite(a.y) ||
      !Number.isFinite(b.x) ||
      !Number.isFinite(b.y)
    ) {
      continue;
    }

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSquared = dx * dx + dy * dy;

    const t = lengthSquared
      ? Math.max(0, Math.min(1, -(a.x * dx + a.y * dy) / lengthSquared))
      : 0;

    if (Math.hypot(a.x + t * dx, a.y + t * dy) <= maxMiles) {
      return true;
    }
  }

  return false;
}

export default function RoutePlanner() {
  const [routeStyle, setRouteStyle] = useState("fastest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const activeRouteRef = useRef(null);
  const routeGraphicsRef = useRef([]);
  const routeMarkersRef = useRef([]);

  const [mapError, setMapError] = useState("");
  const [mapStatus, setMapStatus] = useState(
    "Enter a start and end to preview the route."
  );

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [newStop, setNewStop] = useState("");
  const [stops, setStops] = useState([]);
  const [discoveredPlaces, setDiscoveredPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesStatus, setPlacesStatus] = useState("");

  const [tripName, setTripName] = useState("");
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState("");

const directionsUrl = useMemo(
  () => buildGoogleMapsDirectionsUrl(start, stops, end, routeStyle),
  [start, stops, end, routeStyle]
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
        const { Map } = await importLibrary("maps");
        await importLibrary("places");

        const { Route } = await importLibrary("routes");

        if (cancelled || !mapRef.current) return;

        const map = mapInstanceRef.current ?? new Map(mapRef.current, {
          center: { lat: 39.5501, lng: -105.7821 },
          zoom: 7,
          mapId: "82d1efbf6473addea76e29b7",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;

        const s = normalizeStop(start);
        const e = normalizeStop(end);
        const w = (stops || []).map(normalizeStop).filter(Boolean);

        if (!s || !e) {
          activeRouteRef.current = null;
          routeGraphicsRef.current.forEach((line) => {
  line.setMap(null);
});

routeMarkersRef.current.forEach((marker) => {
  marker.map = null;
});

routeGraphicsRef.current = [];
routeMarkersRef.current = [];

          routeGraphicsRef.current = [];
          routeMarkersRef.current = [];
          setMapStatus("Enter a start and end to preview the route.");
          return;
        }

        setMapStatus("Loading route preview…");

        const request = {
          origin: s,
          destination: e,
          intermediates: w.map((stop) => stop),
          travelMode: "DRIVING",
          routingPreference: "TRAFFIC_UNAWARE",
          routeModifiers: {
            avoidHighways: routeStyle === "backroads",
            avoidTolls: routeStyle === "backroads",
            avoidFerries: routeStyle === "backroads",
          },
          fields: ["path", "legs", "viewport"],
        };


        const { routes } = await Route.computeRoutes(request);

        if (cancelled) return;

        if (!routes?.length) {
          setMapStatus("No route found.");
          return;
        }

        const route = routes[0];

        // Remove the previous route before creating new graphics.
        routeGraphicsRef.current.forEach((line) => {
          line.setMap(null);
        });

        routeMarkersRef.current.forEach((marker) => {
          marker.map = null;
        });

        routeGraphicsRef.current = [];
        routeMarkersRef.current = [];
        activeRouteRef.current = null;

        const polylines = route.createPolylines({
          polylineOptions: {
            strokeColor: "#4285F4",
            strokeOpacity: 1,
            strokeWeight: 5,
          },
        });

const { AdvancedMarkerElement, PinElement } =
  await importLibrary("marker");

const waypointPositions = [
  route.legs[0]?.startLocation,
  ...route.legs.map((leg) => leg.endLocation),
];

const markers = waypointPositions
  .filter(Boolean)
  .map((position, index) => {
    const letter = String.fromCharCode(65 + index);

    const pin = new PinElement({
      glyphText: letter,
      background: "#f09e06",
      borderColor: "#000000",
      glyphColor: "#FFFFFF",
    });

    return new AdvancedMarkerElement({
      position,
      content: pin,
      title: `Waypoint ${letter}`,
    });
  });

        if (cancelled) {
          polylines.forEach((line) => line.setMap(null));
          markers.forEach((marker) => {
            marker.map = null;
          });
          return;
        }

        routeGraphicsRef.current = polylines;
        routeMarkersRef.current = markers;
        activeRouteRef.current = route;

        polylines.forEach((line) => {
          line.setMap(map);
        });

        markers.forEach((marker) => {
          marker.map = map;
        });

        if (route.path?.length) {
          const bounds = new google.maps.LatLngBounds();
          route.path.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);
        }

        setMapStatus("Route preview loaded.");

        trackRouteEvent("planner_route_loaded", {
  route_style: routeStyle,
  stop_count: w.length,
});

        setMapError("");
      } catch (error) {
        if (cancelled) return;
        console.error("Routes API failed:", error);
        setMapError("Google Map failed to load.");
      }
    }

      const timer = window.setTimeout(loadMap, 850);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);

    };
 }, [start, end, stops, routeStyle]);
 
  useEffect(() => {
    if (typeof window === "undefined") return;

    const list = safeReadJSON(STORAGE_SAVED, []);
    setSavedTrips(Array.isArray(list) ? list : []);

    const r = searchParams.get("r");

    if (r) {
      const decoded = decodeRoute(r);

      if (decoded) {
        setRouteStyle(searchParams.get("style") === "backroads" ? "backroads" : "fastest");
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

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !discoveredPlaces.length) return;

    let cancelled = false;
    let infoWindow;
    const markers = [];
    const removeListeners = [];

    async function showPlaceMarkers() {
      try {
        const [{ AdvancedMarkerElement }, { InfoWindow }] =
          await Promise.all([
            importLibrary("marker"),
            importLibrary("maps"),
          ]);

        if (cancelled) return;

        infoWindow = new InfoWindow();

        discoveredPlaces.forEach((place) => {
          if (!place.location) return;

          const marker = new AdvancedMarkerElement({
            map,
            position: place.location,
            title: place.displayName || "Distillery or tasting room",
            zIndex: 1000000,
            gmpClickable: true,
          });

          markers.push(marker);

          function openPopup() {
            const stop = [place.displayName, place.formattedAddress]
              .filter(Boolean)
              .join(", ");

            const content = document.createElement("div");
            content.className = styles.placePopup;

            const name = document.createElement("strong");
            name.textContent = place.displayName || "Distillery or tasting room";

            const address = document.createElement("div");
            address.textContent = place.formattedAddress || "";

            const button = document.createElement("button");
            button.type = "button";
            button.className = styles.smallBtn;
            button.disabled = !place.formattedAddress;
            button.textContent = stops.includes(stop)
              ? "Remove stop"
              : "Add stop";

            button.onclick = () => {
              setStops((prev) =>
                prev.includes(stop)
                  ? prev.filter((item) => item !== stop)
                  : [...prev, stop]
              );
              infoWindow.close();
            };

            content.append(name, address, button);
            infoWindow.setContent(content);
            infoWindow.open({ map, anchor: marker });
          }

          marker.addEventListener("gmp-click", openPopup);
          removeListeners.push(() =>
            marker.removeEventListener("gmp-click", openPopup)
          );
        });
      } catch (error) {
        console.error("Place markers failed:", error);
        setPlacesStatus("Places found, but map pins could not load.");
      }
    }

    showPlaceMarkers();

    return () => {
      cancelled = true;
      infoWindow?.close();
      removeListeners.forEach((remove) => remove());
      markers.forEach((marker) => {
        marker.map = null;
      });
    };
  }, [discoveredPlaces, stops]);

    async function discoverPlaces() {
    const map = mapInstanceRef.current;
    const bounds = map?.getBounds();

    if (!bounds) {
      setPlacesStatus("Wait for the map to load, then try again.");
      return;
    }

    setPlacesLoading(true);
    setPlacesStatus("Finding distilleries and tasting rooms…");
    setDiscoveredPlaces([]);

    try {
      const { Place } = await importLibrary("places");

      const { places } = await Place.searchByText({
        textQuery: "distilleries and spirits tasting rooms",
        fields: ["id", "displayName", "formattedAddress", "location"],
        locationRestriction: bounds,
        maxResultCount: 20,
      });

      const route = activeRouteRef.current;

      if (!route) {
        setPlacesStatus("Load a route before searching for nearby stops.");
        return;
      }

      const path = route.path || [];

      const nearbyPlaces = places.filter((place) =>
        isNearRoute(place.location, path, 10)
      );

      setDiscoveredPlaces(nearbyPlaces);
      trackRouteEvent("planner_places_searched", {
  route_style: routeStyle,
  result_count: nearbyPlaces.length,
});
      setPlacesStatus(
        nearbyPlaces.length
          ? `Found ${nearbyPlaces.length} places within about 10 miles of your route.`
          : "No matches within 10 miles of your route in this map area."
      );
    } catch (error) {
      console.error("Places search failed:", error);
      setPlacesStatus("Search failed. Please try again.");
    } finally {
      setPlacesLoading(false);
    }
  }

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
    setDiscoveredPlaces([]);
    setPlacesStatus("");
    setMapStatus("Enter a start and end to preview the route.");

        activeRouteRef.current = null;

    routeGraphicsRef.current.forEach((line) => {
      line.setMap(null);
    });

    routeMarkersRef.current.forEach((marker) => {
      marker.map = null;
    });

    routeGraphicsRef.current = [];
    routeMarkersRef.current = [];

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

    if (safeWriteJSON(STORAGE_SAVED, next)) {
      trackRouteEvent("planner_trip_saved", {
        save_action: existingIndex >= 0 ? "updated" : "created",
        stop_count: w.length,
      });
    }
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

        trackRouteEvent("planner_trip_loaded", {
      stop_count: Array.isArray(item.route.stops)
        ? item.route.stops.length
        : 0,
    });
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
      trackRouteEvent("planner_link_copied", {
  link_type: "google_maps",
  route_style: routeStyle,
  stop_count: stops.length,
});
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
      trackRouteEvent("planner_link_copied", {
  link_type: "share",
  route_style: routeStyle,
  stop_count: stops.length,
});
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
            placeholder="Trip name (e.g., Aspen Run, Kentucky Bourbon Trail)…"
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

        <div className={styles.field}>
  <div className={styles.label}>Route Style</div>
  <select
    className={styles.select}
    value={routeStyle}
    onChange={(e) => setRouteStyle(e.target.value)}
  >
    <option value="fastest">Fastest Route</option>
    <option value="backroads">Backroads Route</option>
  </select>
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

                <div className={styles.field}>
          <button
            onClick={discoverPlaces}
            disabled={placesLoading}
            className={styles.btn}
            type="button"
          >
            {placesLoading
              ? "Searching…"
              : "Find Distilleries & Tasting Rooms"}
          </button>

          <p className={styles.sub} role="status" aria-live="polite">
            {placesStatus || "Search the area currently shown on the map."}
          </p>
                    <div className={styles.list}>
            {discoveredPlaces.map((place) => {
              const stop = [place.displayName, place.formattedAddress]
                .filter(Boolean)
                .join(", ");
              const alreadyAdded = stops.includes(stop);

              return (
                <div key={place.id} className={styles.item}>
                  <div>
                    <div className={styles.stopText}>
                      {place.displayName}
                    </div>
                    <div className={styles.meta}>
                      {place.formattedAddress}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.smallBtn}
                    disabled={!place.formattedAddress}
                    onClick={() =>
                      setStops((prev) =>
                        prev.includes(stop)
                          ? prev.filter((item) => item !== stop)
                          : [...prev, stop]
                      )
                    }
                  >
                    {alreadyAdded ? "Remove stop" : "Add stop"}
                  </button>
                </div>
              );
            })}
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

        <div className={styles.mapPanel}>
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
            onClick={() => {
              if (!directionsUrl) return;

              trackRouteEvent("planner_maps_opened", {
                route_style: routeStyle,
                stop_count: stops.length,
              });
            }}
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