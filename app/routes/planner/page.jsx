import { Suspense } from "react";
import RoutePlanner from "./RoutePlanner";

export const metadata = {
  title: "Route Planner — Barrels & Backroads",
  description: "Build a route with stops and open it in Google Maps.",
};

export default function RoutePlannerPage() {
  return (
    <Suspense fallback={<div style={{ padding: "24px" }}>Loading route planner…</div>}>
      <RoutePlanner />
    </Suspense>
  );
}
