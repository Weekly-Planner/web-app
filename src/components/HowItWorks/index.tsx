import SectionTitle from "../SectionTitle";
import styles from "./index.module.css";
import strategies from "../../data/strategies.json";

type StrategyType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const HowItWorks = () => {
  return (
    <section id="hiw">
      <SectionTitle title="How it works" />
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {strategies.map((strategy: StrategyType) => {
            return (
              <div key={strategy.id} className={styles.itemContainer}>
                <img src={strategy.image} alt={strategy.title} />
                <div>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
