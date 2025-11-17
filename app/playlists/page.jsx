import styles from "./Playlists.module.css";

export const metadata = {
  title: "Playlists — Barrels & Backroads",
  description:
    "Drive playlists built around time — curated sets that match the miles you actually plan to run.",
};

export default function PlaylistsPage() {
  return (
    <section className={styles.playlistsPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Playlists</p>

        <h1 className={styles.title}>
          Soundtracks built to match your miles.
        </h1>

        <p className={styles.lead}>
          These playlists are built the same way as the routes: on purpose. Each one
          is tuned for a different kind of drive — quick loops, longer runs, and
          full-day pushes — so you can pick a set that fits the time you actually
          have behind the wheel.
        </p>
      </div>

      {/* Main layout */}
      <div className={styles.main}>
        {/* Story / explanation */}
        <div className={styles.story}>
          <h2>How to use these on your trips</h2>
          <p>
            Instead of one giant catch-all mix, Barrels &amp; Backroads playlists are
            broken out by feel and run length. Quick blasts, longer stretches, steady
            day runs, and the kind of all-day push where you&apos;re chasing a
            border, a state line, or just seeing how far daylight and a tank will
            take you.
          </p>
          <p>
            Start light, then stack them. A short loop after work? Fire up{" "}
            <strong>The Quick Pour</strong>. Bigger loop that eats half your day?
            Step up into <strong>Double Barrel</strong> or{" "}
            <strong>The Half Cask</strong>. Long, slow roll with a lot of highway and
            mountain miles? That&apos;s <strong>The Long Pour</strong> and{" "}
            <strong>The Full Pour</strong>.
          </p>

          <h2>What they all have in common</h2>
          <ul className={styles.storyList}>
            <li>Built around how a drive actually feels, not strict genres</li>
            <li>
              Heavy lean toward roots, rock, modern country, and anything that feels
              like open road
            </li>
            <li>
              Intros that ease you into the day, closers that feel like pulling into
              a good stop
            </li>
            <li>
              Easy to save, tweak, and turn into your own go-to sets once they&apos;re
              in your library
            </li>
          </ul>

          <p>
            As more routes go live, you&apos;ll see notes in the route plans about
            which pours pair best with which loops. For now, pick the one that feels
            closest to the run you&apos;re about to take and press play.
          </p>
        </div>

        {/* Cards / each playlist with embed */}
        <aside className={styles.cardStack}>
          {/* The Quick Pour */}
          <div className={styles.card}>
            <p className={styles.cardTag}>The Quick Pour</p>
            <h2 className={styles.cardTitle}>Quick loop — short, hard run</h2>
            <p className={styles.cardBody}>
              Built for one-hour blasts: after work, early morning, or a single pass
              up and back on your favorite stretch. High energy, no filler.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: ~1 hour</span>
              <span className={styles.metaPill}>Energy: sharp &amp; punchy</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/1dhOxdQZongWq6CTdLV1rc?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Double Barrel */}
          <div className={styles.card}>
            <p className={styles.cardTag}>Double Barrel</p>
            <h2 className={styles.cardTitle}>Two-hour run — there and back</h2>
            <p className={styles.cardBody}>
              For half-day drives and longer loops. Starts strong, settles into a
              steady groove, then eases you toward the last few miles.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: ~2 hours</span>
              <span className={styles.metaPill}>Energy: steady cruise</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/4k7GMNlr8NuzNwFS9FLoaW?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* The Half Cask */}
          <div className={styles.card}>
            <p className={styles.cardTag}>The Half Cask</p>
            <h2 className={styles.cardTitle}>Mid-length — settle into the day</h2>
            <p className={styles.cardBody}>
              Perfect for runs that give you a few solid hours out and back with time
              to stop, breathe, and actually enjoy the views instead of hammering
              through.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: ~3 hours</span>
              <span className={styles.metaPill}>Energy: wave, not spike</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/0rBMhyS2ByFeVNeF0hwoCk?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* The Long Pour */}
          <div className={styles.card}>
            <p className={styles.cardTag}>The Long Pour</p>
            <h2 className={styles.cardTitle}>Long run — stretch the legs</h2>
            <p className={styles.cardBody}>
              For days where most of the daylight is going to be spent behind the
              wheel. Enough movement to keep you sharp, enough space to let your head
              wander with the road.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: ~4 hours</span>
              <span className={styles.metaPill}>Energy: paced for distance</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/0rBMhyS2ByFeVNeF0hwoCk?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* The Full Pour */}
          <div className={styles.card}>
            <p className={styles.cardTag}>The Full Pour</p>
            <h2 className={styles.cardTitle}>All-day — empty the tank</h2>
            <p className={styles.cardBody}>
              The long haul. For the kind of all-day drives where you&apos;re chasing
              a destination, a border, or just seeing what a full tank and a full day
              can really do.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: ~5 hours</span>
              <span className={styles.metaPill}>Energy: built for endurance</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/33lUMRPktoXmtuNgn2QJyx?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Fast Grass & Whiskey Roads */}
          <div className={styles.card}>
            <p className={styles.cardTag}>Fast Grass &amp; Whiskey Roads</p>
            <h2 className={styles.cardTitle}>Brand mix — early days, turned loud</h2>
            <p className={styles.cardBody}>
              The Barrels &amp; Backroads heartbeat: modern bluegrass, drive tracks,
              and the kind of songs that make you want to find the long way home.
              This is the sound of the early build — the mix that&apos;s been running
              in the background while this whole thing comes together.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Approx: multi-hour set</span>
              <span className={styles.metaPill}>Energy: rowdy first, quiet last</span>
            </div>
            <div className={styles.embedWrapper}>
              <iframe
                className={styles.embedFrame}
                src="https://open.spotify.com/embed/playlist/1CfvBS9j7NYKwCp77wkuEF?utm_source=generator"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
