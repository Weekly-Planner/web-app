import Menu from "../../components/Menu";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Menu>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1>Plan your life and win your goals</h1>
          <p>
            Verified weekly plans available or set your plans yourself and let
            us worry about implementation.
          </p>
          <a href="/">Learn More</a>
        </div>
      </div>
    </Menu>
  );
}
