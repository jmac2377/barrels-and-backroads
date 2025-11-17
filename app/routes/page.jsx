import Link from "next/link";
import styles from "./Routes.module.css";

export const metadata = {
  title: "Routes — Barrels & Backroads",
  description:
    "Curated road routes built around good roads, good views, and a place to land at the end of the day.",
};

export default function RoutesPage() {
  return (
    <section className={styles.routesPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Routes</p>
        <h1 className={styles.title}>Roads worth taking on purpose.</h1>
        <p className={styles.lead}>
          Every Barrels &amp; Backroads route starts with real miles: climbs, curves,
          pull-offs, and places to exhale at the end of the day. This is the start of
          the library — built for people who actually drive, not just scroll maps.
        </p>
      </div>

      {/* Route grid */}
      <div className={styles.grid}>
        {/* Aspen Run card */}
        <article className={styles.card}>
          <p className={styles.tag}>Colorado • Featured route</p>
          <h2 className={styles.cardTitle}>
            Aspen Run — Independence Pass Loop
          </h2>
          <p className={styles.meta}>Full-day drive · High mountain passes</p>

          <p className={styles.copy}>
            A mountain loop that gives you the good stuff: tight passes, long views,
            and plenty of spots to pull over, breathe, and take it all in. Built for
            an early start, an unhurried pace, and a whiskey-worthy night at the end.
          </p>

          <div className={styles.chipRow}>
            <span className={styles.chip}>High elevation</span>
            <span className={styles.chip}>Twisties</span>
            <span className={styles.chip}>Scenic pull-offs</span>
          </div>

          <div className={styles.linkRow}>
            <Link href="/routes/aspen-run" className={styles.link}>
              View route overview
            </Link>
            <p className={styles.hint}>
              Want a version tailored to your dates and starting point? Ask for a
              custom build on the Contact page.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
