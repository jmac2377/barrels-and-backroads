import styles from "./Contact.module.css";

export const metadata = {
  title: "Contact — Barrels & Backroads",
  description:
    "Reach out to Barrels & Backroads for custom routes, road-trip planning, and collaborations.",
};

export default function ContactPage() {
  return (
    <section className={styles.contactPage}>
      {/* Top intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Contact</p>

        <h1 className={styles.title}>
          Drop a pin. We&apos;ll build the rest.
        </h1>

        <p className={styles.lead}>
          Barrels &amp; Backroads is built the old-fashioned way: one real trip
          at a time. No “top ten” list spam, no auto-generated routes. You tell
          us where you&apos;re starting, how hard you want to drive, and what
          kind of pour you want waiting at the end.
        </p>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* LEFT: info */}
        <div className={styles.left}>
          <h2>What we can help with</h2>
          <ul>
            <li>Weekend loops and long-haul runs</li>
            <li>Routes built around whiskey bars, distilleries, and good food</li>
            <li>Pairing cabins, lodges, or small stays with your drive</li>
            <li>Questions about the Route Club subscription</li>
            <li>Merch and collaboration ideas in the B&amp;B lane</li>
          </ul>

          <h2>What to send us</h2>
          <ul>
            <li>Your name</li>
            <li>Starting city/region and rough dates</li>
            <li>What you&apos;re driving and who&apos;s riding with you</li>
            <li>
              The kind of roads you like (tight passes, open highway, dirt/gravel,
              or “keep it tame”)
            </li>
            <li>
              How many days you want on the road and what a good night looks like
              (quiet cabin, lively bar, lights-out early, etc.)
            </li>
          </ul>

          <p>
            Hit send, then go back to your day. When we reply, you won&apos;t get
            a template — you&apos;ll get a route you could actually pack a bag for.
          </p>
        </div>

        {/* RIGHT: contact card */}
        <aside className={styles.card}>
          <h2>Email</h2>
          <p>The easiest way to reach us:</p>
          <p>
            <a
              href="mailto:barrelsandbackroads25@gmail.com"
              className={styles.emailLink}
            >
              barrelsandbackroads25@gmail.com
            </a>
          </p>
          <p className={styles.small}>
            We&apos;re still small-batch and founder-run. Expect replies in about
            24–48 hours on most days.
          </p>

          <div className={styles.divider} />

          <h2>Base camp</h2>
          <p>
            Colorado, USA — routes tested on real roads, in real weather, with
            real miles under the tires.
          </p>
        </aside>
      </div>
    </section>
  );
}
