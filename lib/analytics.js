export function trackRouteEvent(eventName, parameters = {}) {
  if (
    process.env.NODE_ENV !== "production" ||
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag("event", eventName, {
      ...parameters,
      send_to: "G-3F3598PZR6",
    });
  } catch {
    // Analytics must never interrupt the route tools.
  }
}