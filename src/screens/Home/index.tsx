import Layout from "../../components/Layout";
import styles from "./index.module.css";

const strategies = [
  {
    id: "1",
    title: "Organize the next 7 days",
    description:
      "Add tasks for your next 7 days. Don't worry, you're not allowed to go forward in time and set tasks for the 8th day.",
    image: "/icons/calendar.svg",
  },
  {
    id: "2",
    title: "Avoid distractions",
    description:
      "Using our extension or mobile app, avoid distractions by excluding websites or mobile applications while going through a task.",
    image: "/icons/stop.svg",
  },
  {
    id: "3",
    title: "Achieve your goals",
    description:
      "Update your goals to enhance productivity, move forward in the leaderboard and earn points to gain rewards.",
    image: "/icons/target.svg",
  },
];

export default function Home() {
  return (
    <Layout title="Weekly Planner | Plan yourself per week">
      <Banner />
      <section id="hiw" className={styles.strategiesContainer}>
        <h1>HOW IT WORKS</h1>
        <div className={styles.strategiesListContainer}>
          {strategies.map((strategy) => {
            return (
              <div key={strategy.id} className={styles.strategiesItemContainer}>
                <img
                  src={strategy.image}
                  alt={strategy.title}
                  height={50}
                  width={50}
                />
                <div>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

const Banner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contentContainer}>
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
