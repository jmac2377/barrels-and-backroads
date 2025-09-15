"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  // Phase 1 (SSR/first paint): rely on CSS-only swap (both images in DOM)
  // Phase 2 (after mount): render a single, correct image
  const [mounted, setMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const computePortrait = () => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    const w = vv?.width ?? window.innerWidth;
    const h = vv?.height ?? window.innerHeight;
    const mql =
      typeof window !== "undefined"
        ? window.matchMedia("(orientation: portrait)")
        : { matches: false };
    return mql.matches || h >= w;
  };

  useEffect(() => {
    setMounted(true);

    const update = () => setIsPortrait(computePortrait());

    // run now + delayed rechecks for URL bar settle on Android
    update();
    const t1 = setTimeout(update, 120);
    const t2 = setTimeout(update, 400);

    const onPageShow = () => {
      update();
      const t3 = setTimeout(update, 160);
      const t4 = setTimeout(update, 650);
      timeouts.push(t3, t4);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        update();
        const t5 = setTimeout(update, 150);
        timeouts.push(t5);
      }
    };

    const timeouts = [t1, t2];

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", update);
      window.visualViewport.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", update);
        window.visualViewport.removeEventListener("scroll", update);
      }
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // PHASE 1 (before mount): render both with CSS choosing which shows (instant)
  if (!mounted) {
    return (
      <header className={styles.hero} suppressHydrationWarning>
        <Image
          src="/hero.jpg"
          alt="Barrels & Backroads"
          fill
          className={`${styles.heroImage} ${styles.cssLandscape}`}
          sizes="100vw"
          priority
        />
        <Image
          src="/hero-mobile.jpg"
          alt="Barrels & Backroads (portrait)"
          fill
          className={`${styles.heroImage} ${styles.cssPortrait}`}
          sizes="100vw"
          priority
        />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1>Barrels &amp; Backroads</h1>
        <p className={styles.subhead}>Whiskey. Roads. Adventure.</p>
        <div className={styles.ctaRow}>
          <a href="/routes" className="btn btnPrimary">Explore Routes</a>
          <a href="/stops" className="btn btnGhost">Find Whiskey Stops</a>
        </div>
      </div>
      </header>
    );
  }

  // PHASE 2 (after mount): render exactly one, based on accurate viewport
  const src = isPortrait ? "/hero-mobile.jpg" : "/hero.jpg";
  return (
    <header className={styles.hero} suppressHydrationWarning>
      <Image
        key={src}
        src={src}
        alt="Barrels & Backroads"
        fill
        className={styles.heroImage}
        sizes="100vw"
        priority
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1>Barrels &amp; Backroads</h1>
        <p className={styles.subhead}>Whiskey. Roads. Adventure.</p>
        <div className={styles.ctaRow}>
          <a href="/routes" className="btn btnPrimary">Explore Routes</a>
          <a href="/stops" className="btn btnGhost">Find Whiskey Stops</a>
        </div>
      </div>
    </header>
  );
}
