import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

interface IButton {
  title: string | undefined;
  onClick?: () => void | Promise<void> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
}

const Button: React.FC<IButton> = ({
  title,
  onClick,
  type,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        className,
        styles.button,
        styles[disabled ? "disabled" : "primary"]
      )}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
