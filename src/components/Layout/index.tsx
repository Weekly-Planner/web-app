import React, { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import styles from "./index.module.css";

const routes = [
  { id: "features", title: "Features", path: "/features" },
  { id: "pricing", title: "Pricing", path: "/pricing" },
  { id: "about", title: "About Us", path: "/about" },
  { id: "signup", title: "Signup", path: "/signup" },
  { id: "login", title: "Login", path: "/login" },
];

interface ILayout extends PropsWithChildren {
  title: string;
  isMenuDisplayed?: boolean;
}

const Layout: React.FC<ILayout> = ({
  children,
  title,
  isMenuDisplayed = true,
}) => {
  return (
    <>
      <Helmet>
        <title>{title} | Weekly Planner</title>
      </Helmet>
      {isMenuDisplayed && (
        <div className={styles.container}>
          <a href="/" className={styles.infoContainer}>
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
          </a>
          <div className={styles.menuContainer}>
            {routes.map((route, index) => {
              return (
                <a
                  href={route.path}
                  className={
                    styles[index === routes.length - 1 ? "login" : "menuItem"]
                  }
                >
                  {route.title}
                </a>
              );
            })}
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
