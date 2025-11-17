import styles from "./Stays.module.css";

export const metadata = {
  title: "Stays — Barrels & Backroads",
  description:
    "How Barrels & Backroads thinks about overnight stays — cabins, lodges, and landing spots that match the routes.",
};

export default function StaysPage() {
  return (
    <section className={styles.staysPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Stays</p>

        <h1 className={styles.title}>
          Where you land matters as much as the miles.
        </h1>

        <p className={styles.lead}>
          A good route is only half the trip. The other half is where you drop your
          bags, kick your boots off, and pour something worth sipping. Stays on
          Barrels &amp; Backroads trips are chosen to match the drive, not work
          against it.
        </p>
      </div>

      {/* Main layout */}
      <div className={styles.main}>
        {/* Story / explanation */}
        <div className={styles.story}>
          <h2>How stays fit into a Barrels &amp; Backroads route</h2>
          <p>
            When we build a route, we don&apos;t just draw a line between two towns
            and call it good. The overnight stop is part of the plan. That might be a
            small lodge you can actually walk to dinner from, a cabin tucked off a
            side road, or a base camp you can use to run loops from for a couple of
            days.
          </p>
          <p>
            Stays are chosen with a few things in mind: how you&apos;ll feel pulling
            in at the end of the day, what the morning rollout looks like, and
            whether the spot actually fits the mood of the route. Sometimes that
            means polished and walkable. Sometimes it means a quiet place on the edge
            of town where you can see the stars.
          </p>

          <h2>Types of stays we lean toward</h2>
          <ul className={styles.list}>
            <li>Cabins and lodges that feel connected to the landscape</li>
            <li>
              Small inns or hotels in towns that are worth walking after dark
            </li>
            <li>
              &quot;Last-pour&quot; spots — places where you can leave the keys and
              still find a good drink and a meal
            </li>
            <li>
              Simple, clean roadside stays for nights that are more about the next
              morning&apos;s drive
            </li>
          </ul>

          <p>
            As the library grows, you&apos;ll see featured stays tied directly to
            specific routes, with notes on why they work, when they shine, and when
            to skip them. Until then, stay suggestions are baked into your custom
            route plan instead of living on a public map.
          </p>
        </div>

        {/* Card with rules / boundaries */}
        <aside className={styles.card}>
          <h2 className={styles.cardTitle}>What we will and won&apos;t do</h2>
          <p className={styles.cardIntro}>
            Clear lines so you know what to expect when it comes to overnights on a
            Barrels &amp; Backroads trip.
          </p>

          <ul className={styles.pillarsList}>
            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Suggestions, not bookings</p>
              <p className={styles.pillarText}>
                We&apos;ll point you at stays that fit your route and style. You
                handle the actual booking so your card never runs through us for
                lodging.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Drive-first planning</p>
              <p className={styles.pillarText}>
                Stays are picked to support the drive — safe arrivals, sane timing,
                and no “why are we overnighting here?” moments if we can help it.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Walk-to-a-pour when possible</p>
              <p className={styles.pillarText}>
                When the route makes sense for it, we aim for spots where you can
                leave the car parked and still find a good drink and food on foot.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Honest call-outs</p>
              <p className={styles.pillarText}>
                If a town is great for a night but thin on good stays, or the best
                option is simple but solid, we&apos;ll tell you straight instead of
                dressing it up.
              </p>
            </li>
          </ul>

          <p className={styles.smallNote}>
            When you reach out for a custom route, tell us what you like at the end
            of the day — cabins, walkable towns, quiet outskirts, or a mix — and
            we&apos;ll build the stays to match.
          </p>
        </aside>
      </div>
    </section>
  );
}
