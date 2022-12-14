import moment, { Moment } from "moment";
import React, { useState } from "react";
import {
  AiOutlineInfoCircle as InfoIcon,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  FiLogOut as LogoutIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import { getDays } from "../../constants/utils";
import { useAuth } from "../../contexts/AuthProvider";
import AddTask from "../../modals/AddTask";
import styles from "./index.module.css";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  const [addTaskModalVisibility, setAddTaskModalVisibility] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  async function handleLogout() {
    await logout();
  }

  function toggleAddTaskModalVisibility() {
    if (addTaskModalVisibility) {
      setSelectedDate(null);
    }
    setAddTaskModalVisibility((prevState: boolean) => !prevState);
  }

  function handleAddTask(date: Moment) {
    setSelectedDate(date);
    toggleAddTaskModalVisibility();
  }

  return (
    <div>
      <MenuBar
        email={currentUser?.email}
        onClickInfo={() => {}}
        onClickLogout={handleLogout}
        onClickSettings={() => {}}
      />
      <div className={styles.daysContainer}>
        {getDays().map((item) => {
          const formatted = moment(item.day).format(DATE_TIME_FORMAT);
          return (
            <div key={formatted} className={styles.dayItem}>
              <div className={styles.dayContainer}>
                <p className={styles.dayText}>{formatted}</p>
              </div>
              {item.tasks.length === 0 ? (
                <div
                  className={styles.addTaskContainer}
                  onClick={() => handleAddTask(moment(item.day))}
                >
                  <AiOutlinePlusCircle className={styles.addIcon} size={32} />
                  <p className={styles.addText}>Add a task</p>
                </div>
              ) : (
                <div className={styles.tasksContainer}>
                  {item.tasks.map((task) => {
                    return (
                      <div key={task.id} className={styles.taskItemContainer}>
                        <p className={styles.taskTitle}>{task.title}</p>
                        <p className={styles.taskDescription}>
                          {task.description}
                        </p>
                        <p className={styles.taskCreation}>
                          Created {moment(task.createdAt).fromNow(true)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddTask
        isVisible={addTaskModalVisibility}
        onDismiss={toggleAddTaskModalVisibility}
        selectedDate={selectedDate}
      />
    </div>
  );
}

interface IMenuBar {
  email: string | null | undefined;
  onClickInfo: () => void | Promise<void> | undefined;
  onClickSettings: () => void | Promise<void> | undefined;
  onClickLogout: () => void | Promise<void> | undefined;
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
