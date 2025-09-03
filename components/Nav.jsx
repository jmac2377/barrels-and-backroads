// components/Nav.jsx
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(8px)",
      background: "rgba(15,15,15,0.7)", borderBottom: "1px solid #222"
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "1rem",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <Logo />
        <div style={{ display: "flex", gap: 18 }}>
          <a href="#routes">Routes</a>
          <a href="#stays">Stays</a>
          <a href="#whiskey">Whiskey</a>
        </div>
      </div>
    </nav>
  );
}
