import React from "react";
import styles from "./index.module.css";

interface IButton {
  title: string | undefined;
  onClick?: () => void | Promise<void> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<IButton> = ({ title, onClick, type }) => {
  return (
    <button onClick={onClick} className={styles.primary} type={type}>
      {title}
    </button>
  );
};

export default Button;
