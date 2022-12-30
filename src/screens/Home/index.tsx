import Layout from "../../components/Layout";

import "swiper/css";
import "swiper/css/pagination";
import Banner from "../../components/Banner";
import HowItWorks from "../../components/HowItWorks";
import Features from "../../components/LandingPage/Features";

const Home = () => {
  return (
    <Layout title="Weekly Planner | Plan yourself per week">
      <Banner />
      <HowItWorks />
      <Features />
    </Layout>
  );
};

export default Home;
