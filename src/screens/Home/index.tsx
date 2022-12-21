import Layout from "../../components/Layout";
import styles from "./index.module.css";

const strategies = [
  {
    id: "1",
    title: "1. Become a Planner",
    description:
      "Check out our trail version to ensure Weekly Planner is the best planner for you.",
  },
  {
    id: "2",
    title: "2. Organize the next 7 days",
    description:
      "Add tasks for your next 7 days. Don't worry, you're not allowed to go forward in time and set tasks for the 8th day.",
  },
  {
    id: "3",
    title: "3. Avoid distractions",
    description:
      "Using our extension or mobile app, avoid distractions by excluding websites or mobile applications while going through a task.",
  },
];

export default function Home() {
  return (
    <Layout title="Weekly Planner | Plan yourself per week">
      <Banner />
      <section>
        <h1>How it works</h1>
        {strategies.map((strategy) => {
          return (
            <div key={strategy.id}>
              <h2>{strategy.title}</h2>
              <p>{strategy.description}</p>
            </div>
          );
        })}
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
