import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.tagline}>
        Roads, Spirits, and Experiences Worth Remembering.
      </h2>

      <p className={styles.subtagline}>
        Real Routes · Destination Stories · Small-Batch Spirit R&amp;D
      </p>
    </header>
  );
}