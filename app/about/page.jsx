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
          Barrels &amp; Backroads started with a road, a pour, and an idea worth chasing.
        </h1>

        <p className={styles.lead}>
          It&apos;s a Navajo-owned and operated brand built the long way around —
  through real miles, small-batch spirits, hands-on craftsmanship, and the
  belief that the best things are rarely found on the fastest route. What
  started as an idea on the road is becoming something bigger, one trip,
  one batch, and one story at a time.
        </p>

                <div className={styles.imageBlock}>
  <img
    src="/images/about-founder-jar.jpg"
    alt="Tattooed arms holding a jar of small-batch spirit"
    className={styles.image}
  />

  <img
    src="/images/about-road-mountains.jpg"
    alt="Mountain road leading toward the Tetons"
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
            <p>
  Barrels &amp; Backroads is about creating experiences worth remembering —
  the road, the place you stop, the food, the music, the people you meet along the way, and the pour
  waiting when the driving is done. The website is where those experiences come
  together, alongside the small-batch spirit work happening behind the scenes.
</p>
          </p>
          <p>
            Everything is built from firsthand experience and a hands-on mindset.
  Routes are driven. Recipes are tested. Spirits are made in small batches.
  Photos are taken along the way. Even the merchandise starts with ideas we
  would actually wear, use, or carry ourselves. If it doesn&apos;t feel real,
  useful, or worth sharing, it doesn&apos;t belong here.
          </p>

          <h2>Where it&apos;s headed</h2>
          <p>
            <p>
  The next chapter is about building even richer experiences around both sides
  of the brand: more routes, destinations, food, music, and stories on the road,
  paired with behind-the-scenes spirit R&amp;D, recipe development, maturation, blending,
  and eventually legal production.
</p>
          </p>
          <p>
            The site will keep expanding with real-road travel content, destination
  guides, playlists, recipes, and behind-the-scenes R&amp;D in spirit making —
  from recipe development and fermentation to maturation, blending, and flavor
  trials as we work toward future legal production. The long-term goal is
  bigger than a website, but the approach stays the same: build it carefully,
  keep it personal, and create something people can actually experience.
          </p>
        </div>

        {/* Pillars card */}
        <aside className={styles.card}>
          <h2 className={styles.cardTitle}>What guides us</h2>
          <p className={styles.cardIntro}>
            We believe the best experiences are earned: by taking the longer road,
  making things with care, paying attention to the details, and knowing when
  to slow down and enjoy where you landed.
          </p>

          <ul className={styles.pillarsList}>
            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Real miles only</p>
              <p className={styles.pillarText}>
                We believe the road should be experienced before it&apos;s recommended.
  Routes are driven, stops are checked, and the details that matter — weather,
  fuel, pull-offs, road conditions, and seasonal limitations — are learned
  firsthand whenever possible.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Small-batch first</p>
              <p className={styles.pillarText}>
                We believe good things get better when they&apos;re built in small batches.
  Start with an idea, test it, learn from it, refine it, and only then share it.
  That applies to spirits, recipes, merch, and just about everything else we make.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Nights matter as much as miles</p>
              <p className={styles.pillarText}>
                We believe the destination matters just as much as the drive. A good route
  deserves a good place to land — somewhere worth eating, staying, relaxing,
  and raising a glass once the keys are put away.
              </p>
            </li>

            <li className={styles.pillarItem}>
              <p className={styles.pillarLabel}>Respect the road, respect the pour</p>
              <p className={styles.pillarText}>
                We believe both deserve your full attention. Drive with a clear head, know
  when the keys are done for the night, and enjoy the pour with the same
  respect for craft, place, and company that went into creating the experience.
              </p>
            </li>
          </ul>

          <p className={styles.smallNote}>
            If that sounds like your kind of experience, you&apos;re in the right place.
  Take the longer road, find somewhere worth stopping, and stay awhile.
  We&apos;ll meet you somewhere between the miles, the stories, the pour —
  and maybe one of our own whiskeys in the future.
          </p>
        </aside>
      </div>
    </section>
  );
}
