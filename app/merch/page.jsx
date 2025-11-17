import styles from "./Merch.module.css";

export const metadata = {
  title: "Merch — Barrels & Backroads",
  description:
    "Barrels & Backroads hats and future gear — small-batch runs built around the same roads-and-whiskey mindset.",
};

export default function MerchPage() {
  return (
    <section className={styles.merchPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Merch</p>

        <h1 className={styles.title}>Gear built for the long way around.</h1>

        <p className={styles.lead}>
          Barrels &amp; Backroads merch is treated like everything else we build:
          small-batch, tested in real life, and kept tight instead of flooding the
          shelf. First up — the caps that are going along for every run.
        </p>
      </div>

      {/* Featured hats */}
      <div className={styles.feature}>
        <div className={styles.imageWrap}>
          <img
            src="/images/merch-hats.jpg"
            alt="Four Barrels & Backroads hats in different color variations on a barrel"
            className={styles.image}
          />
        </div>

        <div className={styles.featureBody}>
          <p className={styles.tag}>Coming soon</p>
          <h2 className={styles.itemTitle}>Barrel Room Caps — Founding run</h2>

          <p className={styles.copy}>
            Four colorways, one job: be the hat that actually gets worn. These caps
            are in final testing for fabrics, stitching, and color balance so they
            still look good after long drives, distillery days, and too many
            late-night gas station stops.
          </p>

          <p className={styles.copy}>
            We&apos;re locking the exact variations now — which ones make the cut,
            which ones stay prototypes, and how big the first small-batch run will
            be. When they drop, it&apos;ll be a limited founding run, not an endless
            reprint.
          </p>

          <p className={styles.small}>
            Want first crack at them? Keep an eye on the site and Route Club updates
            for the launch window and ordering details.
          </p>
        </div>
      </div>
    </section>
  );
}
