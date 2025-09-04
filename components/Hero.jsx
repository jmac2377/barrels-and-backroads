// components/Hero.jsx
import Image from "next/image";

export default function Hero() {
  return (
    <header
      style={{
        position: "relative",
        minHeight: "80vh",            // ← change this number to control hero height
        borderBottom: "1px solid #222",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src="/hero.jpg"
        alt="Barrels & Backroads"
        fill
        // Use ONE of these objectFit modes:
        // contain = show entire barrel (may letterbox)
        // cover   = fill width (may crop)
        style={{ objectFit: "contain", objectPosition: "center" }}
        priority
      />

      {/* Gradient overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.6))",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#f3f3f3",
          padding: "4rem 1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: 44, marginBottom: 10 }}>
            Find the perfect road. Sip the perfect pour.
          </h1>
          <p style={{ opacity: 0.85, fontSize: 18 }}>
            Scenic drives · hidden whiskey bars · places worth stopping.
          </p>
        </div>
      </div>
    </header>
  );
}
