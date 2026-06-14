// /components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const update = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      setIsPortrait(portrait);
    };

    update();
    window.addEventListener("resize", update);
    setMounted(true);

    return () => window.removeEventListener("resize", update);
  }, []);

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
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      )}
    </section>
  );
}