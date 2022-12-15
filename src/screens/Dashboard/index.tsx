import classNames from "classnames";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import {
  AiOutlineInfoCircle as InfoIcon,
  AiOutlineMail,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  FiLogOut as LogoutIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import { getTasks } from "../../constants/firebase";
import { useAuth } from "../../contexts/AuthProvider";
import AddTask from "../../modals/AddTask";
import styles from "./index.module.css";

export default function Dashboard() {
  const { currentUser, logout, localUser, verifyEmail } = useAuth();

  const [addTaskModalVisibility, setAddTaskModalVisibility] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const result = await getTasks(currentUser?.uid);
        setTasks(result);
      } catch (err) {
        console.log({ err });
      }
    }

    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFetchTasks() {
    try {
      toggleAddTaskModalVisibility();
      const result = await getTasks(currentUser?.uid);
      setTasks(result);
    } catch (err) {
      console.log({ err });
    }
  }

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

  async function handleVerifyEmail() {
    try {
      await verifyEmail();
      alert(`Email verificatin sent at ${currentUser?.email}`);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div>
      <MenuBar
        nameOrEmail={localUser?.name ?? currentUser?.email ?? ""}
        isEmailVerified={currentUser?.emailVerified ?? false}
        onClickInfo={() => {}}
        onClickLogout={handleLogout}
        onClickSettings={() => {}}
        onClickVerifyEmail={handleVerifyEmail}
      />
      <div className={styles.daysContainer}>
        {tasks &&
          tasks.map((item) => {
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
                  <div
                    className={styles.tasksContainer}
                    onClick={() => handleAddTask(moment(item.day))}
                  >
                    <div className={styles.addMoreTaskContainer}>
                      <p>+ Add Task</p>
                    </div>
                    {item.tasks.map((task: any) => {
                      return (
                        <div
                          key={task.id}
                          className={classNames(
                            styles.taskItemContainer,
                            styles[task.status]
                          )}
                        >
                          <p className={styles.taskTitle}>{task.title}</p>
                          <p className={styles.taskDescription}>
                            {task.description}
                          </p>
                          <p className={styles.taskCreation}>
                            Created{" "}
                            {moment(task.createdAt?.toDate()).fromNow(true)}
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
        onFetchTasks={handleFetchTasks}
      />
    </div>
  );
}

interface IMenuBar {
  nameOrEmail: string | null | undefined;
  isEmailVerified: boolean | undefined;
  onClickInfo: () => void | Promise<void> | undefined;
  onClickSettings: () => void | Promise<void> | undefined;
  onClickLogout: () => void | Promise<void> | undefined;
  onClickVerifyEmail: () => void | Promise<void> | undefined;
}

const MenuBar: React.FC<IMenuBar> = ({
  nameOrEmail,
  onClickInfo,
  onClickSettings,
  onClickLogout,
  isEmailVerified,
  onClickVerifyEmail,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInfoContainer}>
        <h3>Weekly Planner</h3>
        <p>{nameOrEmail}</p>
      </div>
      <div className={styles.actionContainer}>
        {isEmailVerified ? null : (
          <AiOutlineMail
            onClick={onClickVerifyEmail}
            size={24}
            className={styles.emailIcon}
          />
        )}
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
