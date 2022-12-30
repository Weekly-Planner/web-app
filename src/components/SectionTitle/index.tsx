import React from "react";
import styles from "./index.module.css";

type SectionTitleProps = {
  title: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div />
    </div>
  );
};

export default SectionTitle;
