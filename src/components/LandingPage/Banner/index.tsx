import { APP_NAME } from "../../../constants/utils";
import styles from "./index.module.css";

const Banner = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Stay organized, stay on track, with our {APP_NAME} app</h1>
          <p>
            Verified weekly plans available or set your plans yourself and let
            us worry about implementation.
          </p>
          <a href="/">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
