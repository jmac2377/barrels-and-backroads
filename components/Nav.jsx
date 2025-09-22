// components/Nav.jsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",       // stays above hero always
        top: 0,
        left: 0,
        right: 0,
        height: "var(--nav-height)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1.5rem",
        background: "#000",      // ✅ solid black background
        borderBottom: "1px solid #222",
        zIndex: 100,
        color: "#fff",           // ✅ white text by default
      }}
    >
      {/* Brand name */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <strong style={{ letterSpacing: 1, color: "#fff" }}>
          Barrels &amp; Backroads
        </strong>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "1.25rem" }}>
        <Link href="/routes" style={{ color: "#fff", textDecoration: "none" }}>
          Routes
        </Link>
        <Link href="/stays" style={{ color: "#fff", textDecoration: "none" }}>
          Stays
        </Link>
        <Link href="/whiskey" style={{ color: "#fff", textDecoration: "none" }}>
          Whiskey
        </Link>
      </div>
    </nav>
  );
}
