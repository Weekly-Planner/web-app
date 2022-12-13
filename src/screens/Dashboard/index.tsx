import styles from "./index.module.css";
import { useAuth } from "../../contexts/AuthProvider";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";
import React from "react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  return (
    <div>
      <MenuBar
        email={currentUser?.email}
        onClickInfo={() => {}}
        onClickLogout={() => {}}
        onClickSettings={() => {}}
      />
    </div>
  );
}

interface IMenuBar {
  email: string | null | undefined;
  onClickInfo: () => void | undefined;
  onClickSettings: () => void | undefined;
  onClickLogout: () => void | undefined;
}

const MenuBar: React.FC<IMenuBar> = ({
  email,
  onClickInfo,
  onClickSettings,
  onClickLogout,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInfoContainer}>
        <h3>Weekly Planner</h3>
        <p>
          Welcome back <strong>{email}</strong>
        </p>
      </div>
      <div className={styles.actionConainer}>
        <InfoIcon onClick={onClickInfo} size={24} className={styles.icon} />
        <SettingsIcon
          onClick={onClickSettings}
          size={24}
          className={styles.icon}
        />
        <LogoutIcon onClick={onClickLogout} size={24} className={styles.icon} />
      </div>
    </div>
  );
};
