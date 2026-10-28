import FindMyRoute from "../../../components/FindMyRoute";
import styles from "../Routes.module.css";
import plannerStyles from "../../../components/RoutePlanner.module.css";

export const metadata = {
  title: "Find My Route — Barrels & Backroads",
  description:
    "Choose your starting point and drive time. Find a surprise destination with a distillery or tasting room nearby.",
};

export default function FindMyRoutePage() {
  return (
    <section className={plannerStyles.wrap}>
      <div className={styles.hero}>
        <p className={styles.kicker}>Find My Route</p>
        <h1 className={styles.title}>Your time. A road worth taking.</h1>
        <p className={styles.lead}>
          Choose your starting point, your drive time, and Fastest or
          Backroads. We’ll find a town with a distillery or tasting room
          within 10 miles. Take it one way or make it a round trip.
        </p>
      </div>
       <FindMyRoute />
    </section>
  );
}