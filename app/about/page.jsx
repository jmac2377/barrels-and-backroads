import styles from "./About.module.css";

export const metadata = {
  title: "About — Barrels & Backroads",
  description:
    "The story behind Barrels & Backroads — a small-batch brand built around real roads, real miles, and good whiskey.",
};

export default function AboutPage() {
  return (
    <section className={styles.aboutPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>About</p>

        <h1 className={styles.title}>
          Barrels &amp; Backroads started as a daydream on the road.
        </h1>

        <p className={styles.lead}>
          It&apos;s a small-batch brand built the long way around: real drives, real
          bottles, and real nights spent figuring out how to stitch it all together.
          No venture buzzwords. Just a couple of people who love a good route and a
          good pour, and decided to build something around both.
        </p>

                <div className={styles.imageBlock}>
          <img
            src="/images/about-founder-jar.jpg"
            alt="Tattooed arms holding a jar of small-batch spirit"
            className={styles.image}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={styles.main}>
        {/* Story */}
        <div className={styles.story}>
          <h2>What Barrels &amp; Backroads is</h2>
          <p>
            At its core, Barrels &amp; Backroads is simple: road trips and whiskey,
            done with intention. Routes that feel like they were built for you, not
            scraped from a list. Spirits that taste like someone actually cared what
            went into the glass.
          </p>
          <p>
            The brand grew out of miles in the mountains, late-night talks about
            &quot;what if,&quot; and a stubborn streak that refused to settle for
            generic. Every piece of it is hands-on — from the way routes are mapped,
            to the recipes tested in small batches, to the little details that end up
            on labels, flannels, and future merch.
          </p>

          <h2>Where it&apos;s headed</h2>
          <p>
            Barrels &amp; Backroads is being built as a living thing: first the
            routes, then the stays, then the bottles and the room where it all comes
            together. The goal isn&apos;t to be everywhere — it&apos;s to be right
            where it makes sense: on the roads, in the glasses, and in the moments
            that actually feel worth remembering.
          </p>
          <p>
            Over time, you&apos;ll see more route libraries, more stay lists, more
            house spirits, and more ways to bring the brand into your own trips. But
            the promise stays the same: it will always feel small-batch, even when it
            grows.
          </p>
        </div>

        {/* Pillars card */}
        <aside className={styles.card}>
          <h2 className={styles.cardTitle}>What we believe in</h2>
          <p className={styles.cardIntro}>
            A few rules we try not to break — on the road, in the glass, and in the
            way this brand is built.
          </p>

          <ul className={styles.pillarsList}>
            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Real miles only</p>
              <p className={styles.pillarText}>
                If we recommend a route, it&apos;s because it&apos;s been run, not
                just zoomed in on. Weather, fuel stops, pull-offs, and &quot;don&apos;t
                try this in winter&quot; all matter.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Small-batch first</p>
              <p className={styles.pillarText}>
                Whether it&apos;s a route, a recipe, or a piece of merch, it starts
                small. Test it, refine it, then share it. No mass-produced soul.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Nights matter as much as miles</p>
              <p className={styles.pillarText}>
                A good drive deserves a good landing. Cabins, lodges, tasting rooms,
                or a quiet bar stool — the stop at the end is part of the route, not
                an afterthought.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Respect the road, respect the pour</p>
              <p className={styles.pillarText}>
                Designated drivers, clear heads behind the wheel, and no heroics.
                Enjoy the whiskey when the keys are parked and the night has time to
                breathe.
              </p>
            </li>
          </ul>

          <p className={styles.smallNote}>
            If that sounds like your lane, you&apos;re in the right place. Start with
            a route, grab a stay, and we&apos;ll meet you somewhere between the miles
            and the pour.
          </p>
        </aside>
      </div>
    </section>
  );
}
