import styles from "./index.module.css";
import React from "react";

type SectionTitleProps = {
  title: string;
  subtitle: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
