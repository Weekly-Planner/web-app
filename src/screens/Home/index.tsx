import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Layout from "../../components/Layout";
import styles from "./index.module.css";
import features from "../../data/features.json";

import "swiper/css";
import "swiper/css/pagination";
import classNames from "classnames";

const Home = () => {
  return (
    <Layout title="Weekly Planner | Plan yourself per week">
      <Banner />

      <HowItWorks />
      <Features />
    </Layout>
  );
};

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

const HowItWorks = () => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>HOW IT WORKS</h1>
        <div className={styles.titleLine} />
      </div>

      <section id="hiw" className={styles.sectionContainer}>
        <div className={styles.strategiesListContainer}>
          {strategies.map((strategy) => {
            return (
              <div key={strategy.id} className={styles.strategiesItemContainer}>
                <img src={strategy.image} alt={strategy.title} />
                <div>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className={styles.featureContainer}>
      <div>
        <Swiper
          autoplay={{
            delay: 1000,
          }}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {features.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <div
                  className={styles.featureListItemContainer}
                  style={{
                    flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                  }}
                >
                  <div className={styles.featureItemTextContainer}>
                    <h1 className={styles.title}>{item.title}</h1>
                    <div className={styles.divider} />
                    <p className={styles.subtitle}>{item.subtitle}</p>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.featureItemImageContainer}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Home;
