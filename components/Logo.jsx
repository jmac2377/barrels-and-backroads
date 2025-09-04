// components/Logo.jsx
import Image from "next/image";

export default function Logo({ size = 48 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Image
        src="/logo.png"
        alt="Barrels & Backroads"
        width={size}
        height={size}
        priority
      />
      <strong style={{ letterSpacing: 1 }}>Barrels &amp; Backroads</strong>
    </div>
  );
}
