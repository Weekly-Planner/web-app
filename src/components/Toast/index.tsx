import { useEffect } from "react";

import classNames from "classnames";
import { RxCross2 } from "react-icons/rx";
import styles from "./index.module.css";

interface ToastProps {
  position: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  title: string;
  description: string;
  type: "success" | "danger" | "info" | "warning";
  visiblity: boolean;
  timeout?: number;
  onDismiss: () => void | undefined;
}

const Toast: React.FC<ToastProps> = ({
  position,
  title,
  description,
  type,
  visiblity,
  onDismiss,
}) => {
  function handleVisibility() {
    onDismiss();
  }

  if (!visiblity) {
    return null;
  }

  return (
    <>
      <div className={classNames(styles.container, styles[position])}>
        <div
          className={classNames(
            styles.notification,
            styles.toast,
            styles[position],
            styles[type]
          )}
        >
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.message}>{description}</p>
          </div>
          <div onClick={handleVisibility}>
            <RxCross2 size={24} className={styles.crossIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
