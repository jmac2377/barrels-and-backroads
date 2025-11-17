import styles from "./Gallery.module.css";

export const metadata = {
  title: "Gallery — Barrels & Backroads",
  description:
    "Scenes from the road, the mountains, and the distillery behind Barrels & Backroads.",
};

export default function GalleryPage() {
  return (
    <section className={styles.galleryPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Gallery</p>

        <h1 className={styles.title}>
          The roads we run, the views we stop for, and a few moments in between.
        </h1>

        <p className={styles.lead}>
          Photos from mountain passes, quiet streets in mountain towns, distillery
          nights, and whatever else tells the story of Barrels &amp; Backroads.
          As new routes and trips go live, this is where the highlights land.
        </p>
      </div>

      {/* Main layout */}
      <div className={styles.main}>
        {/* Copy / explanation */}
        <div className={styles.story}>
          <h2>What lives in the gallery</h2>
          <p>
            This isn&apos;t meant to be a social feed. It&apos;s a highlight reel:
            the shots that feel like the brand — morning light on the wheel, a
            sticker on an overlook pole, town streets in full autumn, bottles and
            jars lined up after a long run.
          </p>
          <p>
            As the Route Club grows, each major route will have a few anchor shots
            here, so you can see what a loop actually looks like before you lock
            in your dates. Over time, you&apos;ll see more distillery and merch
            pieces show up too: labels, flight boards, buckles, and the little
            details that keep showing up from trip to trip.
          </p>
        </div>

        {/* Simple grid using existing images */}
        <div className={styles.gridWrap}>
          <h2>First shots on the wall</h2>

          <div className={styles.grid}>
            <div className={styles.tile}>
              <img
                src="/images/aspen-drive-cockpit.jpg"
                alt="Driving through Colorado mountain roads with yellow aspens, tattooed arm on the wheel"
              />
              <span className={styles.tileLabel}>Aspen Run — Driver&apos;s seat</span>
            </div>

            <div className={styles.tile}>
              <img
                src="/images/aspen-pass-overlook.jpg"
                alt="Barrels & Backroads sticker on an overlook pole above a winding mountain valley"
              />
              <span className={styles.tileLabel}>Independence Pass overlook</span>
            </div>

            <div className={styles.tile}>
              <img
                src="/images/aspen-town-street.jpg"
                alt="Aspen street lined with fall trees and mountains rising at the end of the road"
              />
              <span className={styles.tileLabel}>Aspen — fall in town</span>
            </div>

            <div className={styles.tile}>
              <img
                src="/images/about-founder-jar.jpg"
                alt="Tattooed arms holding a jar of dark spirit"
              />
              <span className={styles.tileLabel}>Backroom &amp; barrel nights</span>
            </div>
          </div>

          <p className={styles.gridNote}>
            As more trips go live, this grid will grow — one small batch of photos
            at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
