"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import styles from "./FindMyRoute.module.css";

async function loadRouteTools() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Google Maps API key.");
  }

  setOptions({
    key: apiKey,
    version: "weekly",
  });

  const [{ Place }, { DirectionsService }] = await Promise.all([
    importLibrary("places"),
    importLibrary("routes"),
  ]);

  return { Place, DirectionsService };
}

function matchesDriveTime(seconds, selectedHours) {
  if (!Number.isFinite(seconds) || seconds <= 0) return false;

  return Math.floor(seconds / 3600 + 0.5) === Number(selectedHours);
}

function getTownFromPlace(place) {
  const components = place.addressComponents || [];
  const find = (type) =>
    components.find((component) => component.types.includes(type));

  const town = find("locality") || find("postal_town");
  const state = find("administrative_area_level_1");
  const country = find("country");

  if (!town?.longText || !country?.longText) return null;

  const query = [town.longText, state?.longText, country.longText]
    .filter(Boolean)
    .join(", ");

  return {
    key: query.toLowerCase(),
    name: [town.longText, state?.shortText].filter(Boolean).join(", "),
    query,
  };
}

function distanceInMiles(a, b) {
  const radians = Math.PI / 180;
  const latitudeDifference = (b.lat() - a.lat()) * radians;
  const longitudeDifference = (b.lng() - a.lng()) * radians;

  const value =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(a.lat() * radians) *
      Math.cos(b.lat() * radians) *
      Math.sin(longitudeDifference / 2) ** 2;

  return 3958.8 * 2 * Math.asin(Math.sqrt(Math.min(1, value)));
}

async function getCandidateTowns(
  Place,
  origin,
  selectedHours,
  tripType,
  routeStyle
) {
  const oneWayHours =
    Number(selectedHours) / (tripType === "roundtrip" ? 2 : 1);

  const searchDistance = Math.max(
    10,
    oneWayHours * (routeStyle === "backroads" ? 30 : 50)
  );

  const bearing = Math.random() * Math.PI * 2;
  const longitudeScale = Math.max(
    0.2,
    Math.cos(origin.lat() * Math.PI / 180)
  );

  const latitude =
    origin.lat() + Math.cos(bearing) * searchDistance / 69;
  const longitude =
    origin.lng() +
    Math.sin(bearing) * searchDistance / (69 * longitudeScale);

  const halfWidth = Math.max(20, searchDistance * 0.75);
  const latitudeSpan = halfWidth / 69;
  const longitudeSpan = halfWidth / (69 * longitudeScale);
  const wrapLongitude = (value) => ((value + 540) % 360) - 180;

  const { places } = await Place.searchByText({
    textQuery: "distilleries and spirits tasting rooms",
    fields: [
      "id",
      "displayName",
      "formattedAddress",
      "addressComponents",
      "location",
      "businessStatus",
    ],
    locationRestriction: {
      north: Math.min(85, latitude + latitudeSpan),
      south: Math.max(-85, latitude - latitudeSpan),
      east: wrapLongitude(longitude + longitudeSpan),
      west: wrapLongitude(longitude - longitudeSpan),
    },
    maxResultCount: 20,
  });

  const towns = new Map();

  for (const place of places) {
    if (!place.location || place.businessStatus !== "OPERATIONAL") continue;
    if (/\b(office|warehouse)\b/i.test(place.displayName || "")) continue;

    const town = getTownFromPlace(place);
    if (!town) continue;

    if (!towns.has(town.key)) {
      towns.set(town.key, { ...town, businesses: [] });
    }

    towns.get(town.key).businesses.push(place);
  }

  return Array.from(towns.values());
}

function buildPlannerUrl(result) {
  const isRoundTrip = result.tripType === "roundtrip";

  const route = {
    s: result.originAddress,
    e: isRoundTrip ? result.originAddress : result.townQuery,
    w: isRoundTrip ? [result.townQuery] : [],
  };

  const params = new URLSearchParams({
    r: encodeURIComponent(JSON.stringify(route)),
    style: result.routeStyle,
  });

  return `/routes/planner?${params.toString()}`;
}

export default function FindMyRoute() {
  const [start, setStart] = useState("");
  const [hours, setHours] = useState("2");
  const [tripType, setTripType] = useState("roundtrip");
  const [routeStyle, setRouteStyle] = useState("fastest");
    const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState("");

  const searchVersionRef = useRef(0);
  const searchCacheRef = useRef(null);
    const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [mapError, setMapError] = useState("");

  useEffect(() => {
    setResult(null);
    setStatus("");
    setIsSearching(false);
    searchCacheRef.current = null;

    return () => {
      searchVersionRef.current += 1;
    };
  }, [start, hours, tripType, routeStyle]);

    useEffect(() => {
    let cancelled = false;

    async function showMap() {
      if (!mapRef.current) return;

      try {
        await loadRouteTools();

        const [{ Map }, { DirectionsRenderer }] = await Promise.all([
          importLibrary("maps"),
          importLibrary("routes"),
        ]);

        if (cancelled || !mapRef.current) return;

        const map = mapInstanceRef.current ?? new Map(mapRef.current, {
          center: { lat: 39.5501, lng: -105.7821 },
          zoom: 7,
          mapId: "82d1efbf6473addea76e29b7",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        const renderer =
          directionsRendererRef.current ?? new DirectionsRenderer({ map });

        mapInstanceRef.current = map;
        directionsRendererRef.current = renderer;

        renderer.setDirections(
          result ? result.directions : { routes: [] }
        );

        setMapError("");
      } catch (error) {
        console.error("Find My Route map failed:", error);

        if (!cancelled) {
          setMapError("The map could not load. Please refresh and try again.");
        }
      }
    }

    showMap();

    return () => {
      cancelled = true;
    };
  }, [result]);

    async function findRoute(event) {
    event?.preventDefault();
    if (isSearching || !start.trim()) return;

    const version = ++searchVersionRef.current;
    const isCurrent = () => searchVersionRef.current === version;

    setIsSearching(true);
    setResult(null);
    setStatus("Finding a town worth the drive…");

    try {
      const { Place, DirectionsService } = await loadRouteTools();
      if (!isCurrent()) return;

      let cache = searchCacheRef.current;

      if (!cache) {
        const { places } = await Place.searchByText({
          textQuery: start.trim(),
          fields: ["id", "location", "formattedAddress"],
          maxResultCount: 1,
        });

        if (!isCurrent()) return;

        const origin = places[0];

        if (!origin?.location || !origin.id) {
          setStatus("Starting point not found. Try a town and state or address.");
          return;
        }

        cache = { origin, towns: [], seen: new Set() };
        searchCacheRef.current = cache;
      }

      const service = new DirectionsService();
      let checked = 0;
      let batches = 0;

      while (checked < 6) {
        if (!isCurrent()) return;

        if (!cache.towns.length) {
          if (batches >= 2) break;
          batches += 1;

          const candidates = await getCandidateTowns(
            Place,
            cache.origin.location,
            hours,
            tripType,
            routeStyle
          );

          if (!isCurrent()) return;

          cache.towns = candidates.filter(
            (town) => !cache.seen.has(town.key)
          );

          if (!cache.towns.length) continue;
        }

        const index = Math.floor(Math.random() * cache.towns.length);
        const [town] = cache.towns.splice(index, 1);

        if (cache.seen.has(town.key)) continue;
        cache.seen.add(town.key);
        checked += 1;

                setStatus(`Checking the drive to ${town.name}…`);

        const origin = { placeId: cache.origin.id };
        const destination = town.query;
        const isRoundTrip = tripType === "roundtrip";

        let directions;

        try {
          directions = await service.route({
            origin,
            destination: isRoundTrip ? origin : destination,
            waypoints: isRoundTrip
              ? [{ location: destination, stopover: true }]
              : [],
            travelMode: "DRIVING",
            avoidHighways: routeStyle === "backroads",
            avoidTolls: routeStyle === "backroads",
          });
        } catch (error) {
          if (!isCurrent()) return;

          const code = String(error?.code || error?.message || error);
          if (/ZERO_RESULTS|NOT_FOUND/.test(code)) continue;

          throw error;
        }

        if (!isCurrent()) return;

        const legs = directions.routes?.[0]?.legs || [];
        const expectedLegs = isRoundTrip ? 2 : 1;

        if (
          legs.length !== expectedLegs ||
          legs.some((leg) => !Number.isFinite(leg.duration?.value))
        ) {
          continue;
        }

                const townPlace = {
          id: directions.geocoded_waypoints?.[1]?.place_id,
          location: legs[0].end_location,
        };

        if (!townPlace.location) continue;

        const business = town.businesses.find(
          (place) => distanceInMiles(townPlace.location, place.location) <= 10
        );

        if (!business) continue;

        const seconds = legs.reduce(
          (total, leg) => total + leg.duration.value,
          0
        );

        if (!matchesDriveTime(seconds, hours)) continue;

        setResult({
          townName: town.name,
          townQuery: town.query,
          townPlaceId: townPlace.id,
          business,
          seconds,
          directions,
          originAddress: cache.origin.formattedAddress || start.trim(),
          originPlaceId: cache.origin.id,
          tripType,
          routeStyle,
        });

        setStatus("Found your next destination.");
        return;
      }

      setStatus(
        "No matching destination found in this search. Try again to explore another area."
      );
    } catch (error) {
            if (!isCurrent()) return;

      const message = `${error?.code || ""} ${error?.message || error}`;
      const quotaReached =
        /RESOURCE_EXHAUSTED|OVER_QUERY_LIMIT|quota exceeded/i.test(message);

      if (quotaReached) {
        setStatus(
          "Search is busy right now. Please wait a minute before trying again."
        );
      } else {
        console.error("Find My Route failed:", error);
        setStatus("The search could not finish. Please try again.");
      }
    } finally {
      if (isCurrent()) setIsSearching(false);
    }
  }

  return (
    <div className={styles.workspace}>
    <form
      className={styles.form}
        onSubmit={findRoute}
    >
      <div className={styles.fields}>
        <div className={`${styles.field} ${styles.wide}`}>
          <label className={styles.label} htmlFor="find-route-start">
            Starting point
          </label>
          <input
            id="find-route-start"
            className={styles.input}
            value={start}
            onChange={(event) => setStart(event.target.value)}
            placeholder="Town, city, or address…"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="find-route-hours">
            Drive time
          </label>
          <select
            id="find-route-hours"
            className={styles.select}
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          >
            {Array.from({ length: 8 }, (_, index) => index + 1).map(
              (hour) => (
                <option key={hour} value={String(hour)}>
                  About {hour} {hour === 1 ? "hour" : "hours"}
                </option>
              )
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="find-route-trip">
            Trip type
          </label>
          <select
            id="find-route-trip"
            className={styles.select}
            value={tripType}
            onChange={(event) => setTripType(event.target.value)}
          >
            <option value="roundtrip">Round trip</option>
            <option value="oneway">One way</option>
          </select>
        </div>

        <div className={`${styles.field} ${styles.wide}`}>
          <label className={styles.label} htmlFor="find-route-style">
            Route style
          </label>
          <select
            id="find-route-style"
            className={styles.select}
            value={routeStyle}
            onChange={(event) => setRouteStyle(event.target.value)}
          >
            <option value="fastest">Fastest Route</option>
            <option value="backroads">Backroads Route</option>
          </select>

          <p className={styles.hint}>
            Driving time only. Time spent at stops is extra. Round-trip
            time includes both the drive out and the drive home.
          </p>
        </div>
      </div>
            <div className={styles.field}>
        <button
          type="submit"
          className={styles.button}
          disabled={isSearching || !start.trim()}
        >
          {isSearching
            ? "Finding your route…"
            : result
              ? "Find Another"
              : "Find My Route"}
        </button>

        <p className={styles.hint} role="status" aria-live="polite">
          {status}
        </p>
      </div>
            {result && (
        <section
          className={styles.result}
          aria-labelledby="find-route-destination"
        >
          <p className={styles.hint}>Your next destination</p>

          <h2
            id="find-route-destination"
            className={styles.resultTitle}
          >
            {result.townName}
          </h2>

          <p className={styles.resultDetails}>
            Starting from: {result.originAddress}
          </p>

          <p className={styles.resultDetails}>
            Estimated driving:{" "}
            {Math.floor(result.seconds / 3600) > 0
              ? `${Math.floor(result.seconds / 3600)} hr `
              : ""}
            {Math.floor((result.seconds % 3600) / 60)} min
            {" · "}
            {result.tripType === "roundtrip" ? "Round trip" : "One way"}
            {" · "}
            {result.routeStyle === "backroads" ? "Backroads" : "Fastest"}
          </p>

          <div className={styles.business}>
            <p className={styles.hint}>
              A distillery or tasting room within 10 miles
            </p>
            <strong>{result.business.displayName}</strong>
            <p className={styles.resultDetails}>
              {result.business.formattedAddress}
            </p>
          </div>

          <button
            type="button"
            className={styles.button}
            onClick={() => window.location.assign(buildPlannerUrl(result))}
          >
            Use This Route
          </button>

          <p className={styles.attribution} translate="no">
            Google Maps
          </p>
        </section>
      )}
        </form>

    <div className={styles.mapPanel}>
      <h2 className={styles.mapTitle}>Your Route</h2>

      <p className={styles.hint} role="status">
        {mapError ||
          (result
            ? "Your suggested route is shown below."
            : "Find a destination to preview your route.")}
      </p>

      <div
        ref={mapRef}
        className={styles.map}
        aria-label="Suggested route map"
      />
    </div>
    </div>
  );
}