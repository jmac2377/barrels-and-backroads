// components/Logo.jsx
export default function Logo({ size = 28 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Placeholder box for now — we’ll swap this with your barrel logo later */}
      <div style={{
        width: size, height: size, borderRadius: 6, border: "2px solid #f3f3f3"
      }} />
      <strong style={{ letterSpacing: 1 }}>Barrels &amp; Backroads</strong>
    </div>
  );
}
