import styles from "./Recipes.module.css";

export const metadata = {
  title: "Recipes — Barrels & Backroads",
  description:
    "Small-batch kitchen and distillery recipes from Barrels & Backroads — starting with the candied pecans that kicked off the booklet series.",
};

export default function RecipesPage() {
  return (
    <section className={styles.recipesPage}>
      {/* Intro */}
      <div className={styles.hero}>
        <p className={styles.kicker}>Recipes</p>

        <h1 className={styles.title}>Road snacks and pour-side bites.</h1>

        <p className={styles.lead}>
          The Recipes section is where the kitchen and the bottles meet the road:
          snacks that actually travel well, things you&apos;d put out with a good
          pour, and small-batch experiments that turned into keepers. It all started
          with one sheet pan of candied pecans.
        </p>
      </div>

      {/* Featured recipe — Candied Pecans */}
      <div className={styles.feature}>
        <div className={styles.imageWrap}>
          <img
            src="/images/recipes-candied-pecans.jpg"
            alt="Sheet pan of Barrels & Backroads candied pecans cooling on foil"
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          <p className={styles.tag}>Booklet #1 • Kitchen</p>
          <h2 className={styles.recipeTitle}>
            Candied Pecans — Barrels &amp; Backroads Original
          </h2>

          <p className={styles.copy}>
            Sweet, spiced, and dangerous to leave on the counter. These candied
            pecans were the first official Barrels &amp; Backroads recipe — the one
            that turned into a printed booklet and started the whole archive.
          </p>

          <p className={styles.copy}>
            They&apos;re built for road trips and long nights: sturdy enough to ride
            in a bag, good enough to go next to a glass, and simple enough to make on
            a weeknight when you just want the house to smell like sugar and spice.
          </p>

          <p className={styles.small}>
            We&apos;re finalizing how the recipe booklets will be offered online —
            digital, printed, or both. Candied Pecans will stay Booklet #1, the
            starting point for the whole series.
          </p>
        </div>
      </div>
    </section>
  );
}
