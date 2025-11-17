import styles from "./Blog.module.css";

export const metadata = {
  title: "Blog — Barrels & Backroads",
  description:
    "Road notes, trip write-ups, distillery experiments, and behind-the-scenes posts from Barrels & Backroads.",
};

export default function BlogPage() {
  return (
    <section className={styles.blogPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Blog</p>

        <h1 className={styles.title}>
          Road notes, back-room ideas, and the story behind the miles.
        </h1>

        <p className={styles.lead}>
          This is where the routes get a little more ink. Trip recaps, route
          deep dives, distillery experiments, and the small moments that don&apos;t
          fit in a simple map line or playlist title.
        </p>
      </div>

      {/* Main layout */}
      <div className={styles.main}>
        {/* Story / explanation */}
        <div className={styles.story}>
          <h2>What you&apos;ll find here</h2>
          <p>
            Barrels &amp; Backroads is being built one route, one batch, and one
            late-night idea at a time. The blog is where those pieces get
            stitched together into a story: why a route runs the way it does,
            how a mash recipe came to life, what went right, and what got
            learned the hard way.
          </p>

          <p>
            Early on, you&apos;ll see a handful of core threads:
          </p>

          <ul className={styles.storyList}>
            <li>
              <strong>Trip write-ups:</strong> road reports from loops like the
              Aspen Run and whatever comes next.
            </li>
            <li>
              <strong>Route deep dives:</strong> how certain stops, passes, and
              small towns made the cut.
            </li>
            <li>
              <strong>Distillery bench notes:</strong> mash tweaks, cuts,
              aging experiments, and what actually made it into the bottle.
            </li>
            <li>
              <strong>Brand &amp; build:</strong> behind-the-scenes looks at
              merch, labels, uniforms, and the long game for the brand.
            </li>
          </ul>

          <p>
            As the library grows, posts will start tying directly into specific
            routes, playlists, and recipe booklets, so everything feels like one
            connected map instead of scattered pieces.
          </p>
        </div>

        {/* Sections / series cards */}
        <aside className={styles.sectionsGrid}>
          <div className={styles.sectionCard}>
            <p className={styles.sectionKicker}>Series</p>
            <h2 className={styles.sectionTitle}>Road Trips &amp; Route Stories</h2>
            <p className={styles.sectionBody}>
              Full write-ups from the road: what the day actually felt like,
              where the good coffee was, the pull-offs worth stopping for, and
              the little notes you only get from running the miles yourself.
            </p>
            <p className={styles.sectionMeta}>
              First up: Aspen Run — Independence Pass Loop.
            </p>
          </div>

          <div className={styles.sectionCard}>
            <p className={styles.sectionKicker}>Series</p>
            <h2 className={styles.sectionTitle}>Distillery Bench Notes</h2>
            <p className={styles.sectionBody}>
              Practical posts on mash bills, cuts, aging, and flavor experiments.
              Less marketing talk, more &quot;here&apos;s what we tried and what
              we&apos;d do differently next batch.&quot;
            </p>
            <p className={styles.sectionMeta}>
              Tied in with the recipe booklets and Practical Notes.
            </p>
          </div>

          <div className={styles.sectionCard}>
            <p className={styles.sectionKicker}>Series</p>
            <h2 className={styles.sectionTitle}>Playlists &amp; Soundtracks</h2>
            <p className={styles.sectionBody}>
              Notes on why certain tracks made the cut, how each playlist is
              tuned for different run lengths, and the stories behind the songs
              that have become part of the brand&apos;s backbone.
            </p>
            <p className={styles.sectionMeta}>
              Pairs with The Quick Pour through The Full Pour and Fast Grass &amp;
              Whiskey Roads.
            </p>
          </div>

          <div className={styles.sectionCard}>
            <p className={styles.sectionKicker}>Series</p>
            <h2 className={styles.sectionTitle}>Brand, Merch &amp; Build</h2>
            <p className={styles.sectionBody}>
              A closer look at the gear: buckle designs, flannels, Zippos, flight
              boards, labels, and the decisions behind each drop instead of just
              tossing products on a shelf.
            </p>
            <p className={styles.sectionMeta}>
              Great place to see what&apos;s coming before a merch drop goes live.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
