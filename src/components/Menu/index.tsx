import React, { PropsWithChildren } from "react";
import styles from "./index.module.css";

const Menu: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img
            src="/icons/temp-logo.svg"
            alt="Temporary Logo"
            width={50}
            height={50}
          />
          <div>
            <h2>Weekly Planner</h2>
            <p>Train yourself per week</p>
          </div>
        </div>
        <div className={styles.menuContainer}>
          <a className={styles.menuItem} href="/features">
            Features
          </a>
          <a className={styles.menuItem} href="/pricing">
            Pricing
          </a>
          <a className={styles.menuItem} href="/about">
            About
          </a>
          <a className={styles.menuItem} href="/signup">
            Become a Planner
          </a>
          <a className={styles.login} href="/login">
            Login
          </a>
        </div>
      </div>
      {children}
    </>
  );
};

export default Menu;
