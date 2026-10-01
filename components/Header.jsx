import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.tagline}>
        Roads, spirits, and experiences worth remembering.
      </h2>

      <p className={styles.subtagline}>
        Real routes · destination stories · small-batch spirit R&amp;D
      </p>
    </header>
  );
}