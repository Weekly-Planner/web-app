import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { BsXLg } from "react-icons/bs";

export type ToastType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
};

type ToastProps = {
  notifications: ToastType[];
  position: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  autoDelete: boolean;
  autoDeleteTime: number;
};

const Toast: React.FC<ToastProps> = ({
  notifications,
  position,
  autoDeleteTime,
  autoDelete,
}) => {
  const [list, setList] = useState(notifications);

  const deleteToast = (id: any) => {
    setList((prevState: any[]) => {
      const startIndex = prevState.findIndex((e) => e.id === id);
      prevState.splice(startIndex, 1);
      return [...prevState];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && notifications.length && list.length) {
        deleteToast(notifications[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [notifications, autoDelete, autoDeleteTime, list]);

  useEffect(() => {
    setList(notifications);
  }, [notifications]);

  return (
    <>
      <div className={classNames(styles.container, styles[position])}>
        {list.map((toast: ToastType) => (
          <div
            key={toast.id}
            className={classNames(
              styles.container,
              styles.toast,
              styles[position],
              styles[toast.type]
            )}
          >
            <div className={styles.image}>
              <img src={toast.icon} alt={toast.type} />
            </div>
            <div className={styles.content}>
              <div className={styles.actionHeaderContainer}>
                <p className={styles.title}>{toast.title}</p>
                <BsXLg
                  size={16}
                  className={styles.closeIcon}
                  onClick={() => deleteToast(toast.id)}
                />
              </div>
              <p className={styles.message}>{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
