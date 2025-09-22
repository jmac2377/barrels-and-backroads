// /components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isShortLandscape, setIsShortLandscape] = useState(false); // <= NEW

  useEffect(() => {
    const update = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      setIsPortrait(portrait);

      // Short landscape override: match our CSS rule (<= 500px height)
      const shortLandscape =
        !portrait && window.innerHeight <= 500;
      setIsShortLandscape(shortLandscape);
    };

    update();
    window.addEventListener("resize", update);
    setMounted(true);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Object fit logic:
  // - Portrait: contain (no crop, letterbox allowed)
  // - Short landscape (<=500px tall): cover (fill, crop allowed)
  // - Normal landscape: cover (full bleed, crop allowed)
  const objectFit = isPortrait ? "contain" : "cover";

  return (
    <section
      className={`${styles.hero} ${!mounted ? styles.swapFirstPaint : ""}`}
      role="img"
      aria-label="Roads, Whiskey, and Wide Open Skies"
    >
      {mounted && (
        <Image
          src={isPortrait ? "/images/hero-mobile.jpg" : "/images/hero-desktop.jpg"}
          alt="Roads, Whiskey, and Wide Open Skies"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: isShortLandscape ? "cover" : objectFit,
            objectPosition: "center",
          }}
        />
      )}
    </section>
  );
}
