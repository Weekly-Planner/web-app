import styles from "./index.module.css";

const Banner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1>Plan your life and win your goals</h1>
        <p>
          Verified weekly plans available or set your plans yourself and let us
          worry about implementation.
        </p>
        <a href="/">Learn More</a>
      </div>
    </section>
  );
};

export default Banner;
