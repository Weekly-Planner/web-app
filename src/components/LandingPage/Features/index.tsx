import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import features from "../../../data/features.json";
import styles from "./index.module.css";

import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../SectionTitle";

type FeatureType = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const Features = () => {
  return (
    <section id="features" className={styles.container}>
      <SectionTitle title="Features" />
      <Swiper
        autoplay={{
          delay: 1000,
        }}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {features.map((item: FeatureType, index: number) => {
          return (
            <SwiperSlide key={item.id}>
              <div
                className={styles.itemContainer}
                style={{
                  flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                }}
              >
                <div className={styles.itemTextContainer}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <div className={styles.divider} />
                  <p className={styles.subtitle}>{item.subtitle}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Features;