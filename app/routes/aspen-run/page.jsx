export const metadata = {
  title: "Aspen Run — Independence Pass Loop | Barrels & Backroads",
  description:
    "Overview of the Aspen Run — Independence Pass Loop route from Barrels & Backroads.",
};

export default function AspenRunPage() {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "3rem 1.5rem 5rem",
  };

  const kickerStyle = {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: "0.75rem",
    color: "#f5c46a",
    marginBottom: "0.75rem",
  };

  const headingStyle = {
    fontSize: "clamp(2rem, 3vw, 2.6rem)",
    fontWeight: 600,
    marginBottom: "0.75rem",
  };

  const bodyStyle = {
    color: "#d4d4d4",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
  };

  const subheadingStyle = {
    fontSize: "1.1rem",
    margin: "1.5rem 0 0.5rem",
  };

  // New gallery layout: 2 columns, left column stacks 2 photos
  const galleryWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
    gap: "1.25rem",
    alignItems: "flex-start",
    marginTop: "1rem",
  };

  const leftColStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem", // tighten vertical spacing between left images
  };

  const rightColStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid #262626",
    objectFit: "cover",
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.6)",
    display: "block",
  };

  return (
    <main style={containerStyle}>
      <p style={kickerStyle}>Route overview</p>

      <h1 style={headingStyle}>Aspen Run — Independence Pass Loop</h1>

      <p style={bodyStyle}>
        This is the flagship mountain loop for Barrels &amp; Backroads — built around
        long sightlines, tight sections, and enough pull-offs to actually enjoy the
        view instead of just chasing the next corner. See if you can spot our sticker
        at one of the pull-offs.
      </p>

      <h2 style={subheadingStyle}>The feel</h2>
      <p style={bodyStyle}>
        Think early start, coffee in hand, cool air, and a day that doesn&apos;t need
        to be rushed. High-elevation passes, big views, and a loop that lands you
        somewhere you&apos;d actually stay the night.
      </p>

      <h2 style={subheadingStyle}>On the road</h2>
      <p style={bodyStyle}>
        A glimpse of what the loop actually looks like from the driver&apos;s seat, at
        the overlook, and rolling through town at the end of the day.
      </p>

      {/* New gallery layout */}
      <div style={galleryWrapperStyle}>
        {/* Left column: cockpit + town */}
        <div style={leftColStyle}>
          <img
            src="/images/aspen-drive-cockpit.jpg"
            alt="Driving through Colorado mountain roads with yellow aspens, tattooed arm on the wheel"
            style={imageStyle}
          />
          <img
            src="/images/aspen-town-street.jpg"
            alt="Aspen street lined with fall trees and mountains rising at the end of the road"
            style={imageStyle}
          />
        </div>

        {/* Right column: overlook / sticker */}
        <div style={rightColStyle}>
          <img
            src="/images/aspen-pass-overlook.jpg"
            alt="Barrels & Backroads sticker on an overlook pole above a winding mountain valley"
            style={imageStyle}
          />
        </div>
      </div>

      <h2 style={subheadingStyle}>What&apos;s next</h2>
      <p style={bodyStyle}>
        We&apos;re tightening the stop-by-stop notes, fuel tips, and timing for
        different seasons. Until then, you can still request a dialed-in version built
        around your dates, starting point, and comfort level behind the wheel.
      </p>

      <h2 style={subheadingStyle}>Want it customized?</h2>
      <p style={bodyStyle}>
        Head over to the Contact page and tell us where you&apos;re starting from,
        when you&apos;re running it, and what kind of stops you want along the way.
        We&apos;ll build a version that actually fits your trip instead of a generic
        map line.
      </p>
    </main>
  );
}
