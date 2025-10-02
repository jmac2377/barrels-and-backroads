"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";
import navItems from "@/config/nav";

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on ESC for accessibility
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className={styles.nav}>
      {/* Left: Brand */}
      <div className={styles.logo}>
  <Link href="/">
    Barrels &amp; Backroads<span style={{ fontSize: "0.7em", marginLeft: "0.15em" }}>™</span>
  </Link>
</div>

      {/* Mobile toggle (visible under 768px via CSS) */}
      <button
        type="button"
        className={styles.mobileToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open ? "true" : "false"}
        aria-controls="primary-navigation"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Hamburger / X icon (pure SVG, no deps) */}
        {open ? (
          // X icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          // Hamburger icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        <span className={styles.srOnly}>Menu</span>
      </button>

      {/* Right: Links (desktop visible; mobile toggled via .open) */}
      <ul
  id="primary-navigation"
  className={`${styles.links} ${open ? styles.linksOpen : ""}`}
>
        {navItems.map(({ label, href }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                style={isActive ? { opacity: 0.7 } : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
