// app/page.js
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <section style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
        <h2>About Barrels & Backroads</h2>
        <p>
          Road trips, scenic routes, and great whiskey. We’re mapping the best
          drives, tasting rooms, and cozy spots to land for the night.
        </p>
      </section>
      <footer style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
        © {new Date().getFullYear()} Barrels & Backroads
      </footer>
    </main>
  );
}
