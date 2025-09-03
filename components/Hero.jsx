// components/Hero.jsx
export default function Hero() {
  return (
    <header style={{
      padding: "5rem 1.5rem",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop') center/cover",
      textAlign: "center",
      borderBottom: "1px solid #222"
    }}>
      <h1 style={{ fontSize: 44, marginBottom: 10 }}>
        Find the perfect road. Sip the perfect pour.
      </h1>
      <p style={{ opacity: 0.85, fontSize: 18 }}>
        Scenic drives · hidden whiskey bars · places worth stopping.
      </p>
      <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
        <a href="#start" style={{
          padding: "0.8rem 1.2rem", border: "1px solid #fff", borderRadius: 8
        }}>
          Start Planning
        </a>
        <a href="#learn" style={{ padding: "0.8rem 1.2rem" }}>
          Learn More →
        </a>
      </div>
    </header>
  );
}
