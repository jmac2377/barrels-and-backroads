// app/page.js
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />

      <section
        style={{
          padding: "3rem 1.25rem",
          maxWidth: 1000,
          margin: "0 auto",
          lineHeight: 1.6,
        }}
        aria-labelledby="about-title"
      >
        <h2 id="about-title" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          About Barrels & Backroads
        </h2>
        <p style={{ marginBottom: "1rem", opacity: 0.9 }}>
          We map slow, beautiful drives to memorable tasting rooms and cozy places to land.
          Short, scenic, and stress-free—so the journey feels as good as the destination.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/routes" className="btn btnPrimary">Explore Routes</Link>
          <Link href="/stops" className="btn btnGhost">Find Whiskey Stops</Link>
        </div>
      </section>

      <footer style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
        © {new Date().getFullYear()} Barrels & Backroads
      </footer>
    </main>
  );
}
