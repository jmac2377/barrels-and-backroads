"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";
import navItems from "@/config/nav";

/* normalize paths: strip query/hash, ensure leading slash, drop trailing slash (except "/") */
function norm(p) {
  if (!p) return "/";
  const clean = p.split(/[?#]/)[0].trim();
  let out = clean.startsWith("/") ? clean : "/" + clean;
  if (out !== "/" && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

export default function Nav() {
  const pathnameRaw = usePathname() || "/";
  const pathname = norm(pathnameRaw);

  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // ESC to close
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Measure header for mobile dropdown; lock body scroll when open
  useEffect(() => {
    const el = navRef.current;
    if (el) el.style.setProperty("--nav-height", `${el.offsetHeight || 64}px`);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <nav ref={navRef} className={styles.nav} role="navigation" aria-label="Primary">
      {/* Brand — no underline */}
      <div className={styles.logo}>
        <Link href="/">
          Barrels &amp; Backroads
          <span style={{ fontSize: "0.7em", marginLeft: "0.15em" }}>™</span>
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        className={styles.mobileToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open ? "true" : "false"}
        aria-controls="primary-navigation"
        onClick={() => setOpen(v => !v)}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        <span className={styles.srOnly}>Menu</span>
      </button>

      {/* Links */}
      <ul id="primary-navigation" className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
        {navItems.map(({ label, href }) => {
          // keep aria-current accurate (not used for styling now)
          const target = norm(href || "/");
          const isActive =
            target === "/"
              ? pathname === "/"
              : pathname === target || pathname.startsWith(target + "/");

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
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
