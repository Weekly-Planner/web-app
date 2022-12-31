import { useState } from "react";
import Banner from "../../components/LandingPage/Banner";
import HowItWorks from "../../components/LandingPage/HowItWorks";
import Features from "../../components/LandingPage/Features";
import Layout from "../../components/Layout";
import pricing from "../../data/pricing.json";
import styles from "./index.module.css";

type SubscriptionTimelineTypes = "monthly" | "yearly";

const Home = () => {
  const [subscriptionTimeline, setSubscriptionTimeline] =
    useState<SubscriptionTimelineTypes>("monthly");

  function handleTimelineToggle() {
    const invertedTimeline =
      subscriptionTimeline === "monthly" ? "yearly" : "monthly";
    setSubscriptionTimeline(invertedTimeline);
  }

  return (
    <div className={styles.container}>
      <Banner />
      <HowItWorks />
      <Features />
      {/* <section>
        <div className={styles.container}>
          <table className={styles.table}>
            <tr>
              <th></th>
              <th>Standard</th>
              <th>Hustler</th>
              <th>Achiever</th>
            </tr>
            {pricing.map((price) => {
              return (
                <tr className={styles.itemContainer} key={price.id}>
                  <td className={styles.title}>{price.title}</td>
                  <td>{price.standard ? price.standard : "N/A"}</td>
                  <td>{price.hustler ? price.hustler : "N/A"}</td>
                  <td>{price.achiever ? price.achiever : "N/A"}</td>
                </tr>
              );
            })}
            <tr>
              <th>
                <button
                  className={styles.timelineAction}
                  onClick={handleTimelineToggle}
                >
                  Change to{" "}
                  {subscriptionTimeline === "monthly" ? "Yearly" : "Monthly"}
                </button>
              </th>
              <th>FREE TRAIL</th>
              <th>
                ${generatePrice(subscriptionTimeline, 10)} /{" "}
                {subscriptionTimeline === "monthly" ? "month" : "year"}
              </th>
              <th>
                ${generatePrice(subscriptionTimeline, 25)} /{" "}
                {subscriptionTimeline === "monthly" ? "month" : "year"}
              </th>
            </tr>
          </table>
        </div>
      </section> */}
    </div>
  );
};

export default Home;

function generatePrice(timeline: "monthly" | "yearly", price: number) {
  if (timeline === "monthly") {
    return price;
  } else if (timeline === "yearly") {
    return price * 12 - 20;
  }
}
