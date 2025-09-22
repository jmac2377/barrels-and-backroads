import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.tagline}>
        Find the perfect road. Sip the perfect pour.
      </h2>
      <p className={styles.subtagline}>
        Scenic drives · hidden whiskey bars · places worth stopping.
      </p>
    </header>
  );
}
