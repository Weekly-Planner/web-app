import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

interface IButton {
  title: string | undefined;
  onClick?: () => void | Promise<void> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
}

const Button: React.FC<IButton> = ({ title, onClick, type, className }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.primary, className)}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
