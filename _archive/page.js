// app/page.js
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CTAStack from "../components/CTAStack"; // 👈 add this

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />

      {/* 👇 CTA stack lives right under the hero */}
      <div style={{ marginTop: "2rem" }}>
        <CTAStack />
      </div>

      <section
        style={{
          padding: "2rem",
          maxWidth: 1000,
          margin: "0 auto",
          color: "#e5e5e5",
        }}
      >
        <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>
          About Barrels & Backroads
        </h2>
        <p>
          Road trips, scenic routes, and great whiskey. We’re mapping the best
          drives, tasting rooms, and cozy spots to land for the night.
        </p>
      </section>

      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#aaa",
          borderTop: "1px solid #222",
        }}
      >
        © {new Date().getFullYear()} Barrels & Backroads
        <div style={{ marginTop: "0.25rem" }}>Loveland, CO</div>
      </footer>
    </main>
  );
}
