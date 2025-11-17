import styles from "./Faq.module.css";

export const metadata = {
  title: "FAQ — Barrels & Backroads",
  description:
    "Answers to common questions about custom routes, Route Club, and how Barrels & Backroads works.",
};

export default function FaqPage() {
  return (
    <section className={styles.faqPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>FAQ</p>
        <h1 className={styles.title}>How this all actually works.</h1>
        <p className={styles.lead}>
          A quick rundown of what Barrels &amp; Backroads does, what you get with a
          custom route, and how Route Club and future stays will fit into the mix.
          Straight answers, no fluff.
        </p>
      </div>

      {/* Two-column FAQ grid */}
      <div className={styles.grid}>
        {/* Column 1 — Routes & Route Club */}
        <div>
          <p className={styles.groupTitle}>Routes &amp; Route Club</p>

          <div className={styles.item}>
            <p className={styles.question}>What exactly do I get with a custom route?</p>
            <p className={styles.answer}>
              You get a hand-built route for your dates and starting point — not a
              random list pulled off a map app. Expect: the main drive, suggested
              stops, fuel and food notes, timing guidance, and a suggested landing
              spot for the night. If you want extras (alternate options, playlists,
              or multiple days), we can layer those in too.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              Where do you build routes — is this just Colorado?
            </p>
            <p className={styles.answer}>
              The heart of Barrels &amp; Backroads is in the Rockies, so Colorado and
              surrounding states are home base. That&apos;s where most early routes
              live. If you&apos;re planning something farther out, reach out anyway —
              we&apos;ll tell you straight if we can do it right or if it should wait
              until we&apos;ve logged more miles there.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>What is Route Club?</p>
            <p className={styles.answer}>
              Route Club is the subscription side of Barrels &amp; Backroads. Members
              will get a set number of custom or semi-custom routes each month,
              priority in the queue, and first shot at new route drops. The payment
              side is being wired up now; until that&apos;s live, all work is
              one-off, booked directly through the{" "}
              <a href="/contact">Contact</a> page.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              How much notice do you need for a custom route?
            </p>
            <p className={styles.answer}>
              Best case: at least 2–3 weeks before you roll out, especially for
              longer trips or busy seasons. Shorter notice is possible, but it
              depends on the current queue. If your dates are tight, mention that in
              your first message and we&apos;ll tell you what&apos;s realistic.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              Do you book hotels, cabins, or flights for me?
            </p>
            <p className={styles.answer}>
              No. Barrels &amp; Backroads focuses on the routes, stops, and stay
              suggestions — you&apos;ll handle the actual bookings. We&apos;ll point
              you toward the kind of stays that match the route, but your card never
              runs through us for lodging or travel.
            </p>
          </div>

          <p className={styles.note}>
            If you&apos;re not sure whether your idea fits, send it anyway. We&apos;d
            rather say &quot;not yet&quot; than overpromise.
          </p>
        </div>

        {/* Column 2 — Safety, payments, misc */}
        <div>
          <p className={styles.groupTitle}>Safety, payments &amp; everything else</p>

          <div className={styles.item}>
            <p className={styles.question}>
              Is this a guided tour or self-guided?
            </p>
            <p className={styles.answer}>
              Barrels &amp; Backroads routes are self-guided. You get the plan, you
              drive it on your own terms. No caravans, no buses, no one talking at
              you over a microphone — just a clear route that&apos;s been thought
              through ahead of time.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              How do payments and pricing work?
            </p>
            <p className={styles.answer}>
              For now, everything runs one trip at a time. When you reach out on the{" "}
              <a href="/contact">Contact</a> page, we&apos;ll talk through what
              you&apos;re after and quote based on length, complexity, and add-ons
              (like playlists or multiple route options). As Route Club comes online,
              subscriptions will handle most ongoing trips.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              What happens if weather or closures change the plan?
            </p>
            <p className={styles.answer}>
              Mountain weather and road work happens. Routes are built with season and
              conditions in mind, but things can still change. If a major closure
              hits your route before you leave, we&apos;ll work with you on an
              adjustment or alternate plan based on what&apos;s possible.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>
              What&apos;s your stance on drinking and driving?
            </p>
            <p className={styles.answer}>
              Simple: don&apos;t. Barrels &amp; Backroads is built around great
              routes and great pours — just not at the same time. Enjoy the whiskey
              when the keys are parked, the driver is done for the day, and everyone
              has a safe place to land.
            </p>
          </div>

          <div className={styles.item}>
            <p className={styles.question}>How do I get started?</p>
            <p className={styles.answer}>
              Head to the <a href="/contact">Contact</a> page and tell us where
              you&apos;re starting from, when you&apos;re going, what you like in a
              road, and how many days you want to be out. From there, we&apos;ll
              confirm the scope, give you pricing, and start building.
            </p>
          </div>

          <p className={styles.note}>
            Don&apos;t see your question here? Ask it on the Contact page and we&apos;ll
            add the good ones to this list.
          </p>
        </div>
      </div>
    </section>
  );
}
