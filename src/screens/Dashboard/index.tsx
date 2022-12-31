import classNames from "classnames";
import { deleteDoc, doc } from "firebase/firestore";
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
import Toast, { ToastType } from "../../components/Toast";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import { getTasks } from "../../constants/firebase";
import {
  APP_NAME,
  DayItemType,
  generateNotification,
  NotificationType,
  TaskItemType,
} from "../../constants/utils";
import { useAuth } from "../../contexts/AuthProvider";
import TaskDetails, { TaskActions } from "../../modals/TaskDetails";
import { firestore } from "../../services/firebase";
import styles from "./index.module.css";

export default function Dashboard() {
  const { currentUser, logout, localUser, verifyEmail } = useAuth();
  const [notifications, setNotifications] = useState<ToastType[]>([]);

  const [taskDetailsModalVisibility, setTaskDetailsModalVisibility] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [tasks, setTasks] = useState<DayItemType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskItemType | null>();
  const [taskAction, setTaskAction] = useState<TaskActions>(TaskActions.ADD);

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

  async function handleFetchTasks(title: string, action: TaskActions) {
    try {
      toggleAddTaskModalVisibility();
      const result = await getTasks(currentUser?.uid);
      setTasks(result);

      showNotification(action, title);
    } catch (err) {
      console.log({ err });
    }
  }

  function showNotification(
    action: TaskActions,
    taskTitle?: string | undefined
  ) {
    const type: NotificationType =
      action === TaskActions.ADD ? "success" : "info";
    const title: string =
      action === TaskActions.ADD ? "Task Added" : "Task Updated";
    const description: string = `${taskTitle} has been ${
      action === TaskActions.ADD ? "added" : "updated"
    } on your calendar.`;
    const notification = generateNotification(type, title, description);
    setNotifications((prevState: ToastType[]) => [...prevState, notification]);
  }

  async function handleLogout() {
    await logout();
  }

  async function handleTaskDelete(id: string | undefined) {
    try {
      if (!id) {
        throw new Error("wp/no-such-id");
      }
      toggleAddTaskModalVisibility();
      await deleteDoc(doc(firestore, `users/${currentUser?.uid}/tasks/${id}`));
      const result = await getTasks(currentUser?.uid);
      setTasks(result);
      const notification = generateNotification(
        "warning",
        "Task Deleted",
        "Selected task has been selected from the calendar."
      );
      setNotifications((prevState: ToastType[]) => [
        ...prevState,
        notification,
      ]);
    } catch (err) {}
  }

  function toggleAddTaskModalVisibility() {
    if (taskDetailsModalVisibility) {
      setSelectedDate(null);
      setSelectedTask(null);
      setTaskAction(TaskActions.ADD);
    }
    setTaskDetailsModalVisibility((prevState: boolean) => !prevState);
  }

  function showTaskDetailsModal(item: any) {
    setTaskAction(TaskActions.EDIT);
    setSelectedTask(item);
    setTaskDetailsModalVisibility((prevState: boolean) => !prevState);
  }

  function handleAddTask(date: Moment) {
    setSelectedDate(date);
    toggleAddTaskModalVisibility();
  }

  async function handleVerifyEmail() {
    try {
      await verifyEmail();
      const email = currentUser?.email;
      const notification = generateNotification(
        "success",
        "Verification Email Sent",
        `Kindly, check your email address (${email}) for the verification email.`
      );
      setNotifications((prevState: ToastType[]) => [
        ...prevState,
        notification,
      ]);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className={styles.container}>
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
          tasks.map((item: DayItemType) => {
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
                    <div
                      className={styles.addMoreTaskContainer}
                      onClick={() => handleAddTask(moment(item.day))}
                    >
                      <p>+ Add Task</p>
                    </div>
                    <div className={styles.taskListContainer}>
                      {item.tasks.map((task: TaskItemType) => {
                        return (
                          <div
                            key={task.id}
                            className={classNames(
                              styles.taskItemContainer,
                              styles[task.status]
                            )}
                            onClick={() => showTaskDetailsModal(task)}
                          >
                            <p className={styles.taskTitle}>{task.title}</p>
                            <p className={styles.taskDescription}>
                              {task.description}
                            </p>
                            <div className={styles.tagsContainer}>
                              <p
                                className={classNames(
                                  styles.tag,
                                  styles[task.priority]
                                )}
                              >
                                {task.priority}
                              </p>
                              <p className={styles.tag}>{task.category}</p>
                            </div>
                            <p className={styles.taskCreation}>
                              Created{" "}
                              {moment(task.createdAt?.toDate()).fromNow(false)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <TaskDetails
        isVisible={taskDetailsModalVisibility}
        onDismiss={toggleAddTaskModalVisibility}
        selectedDate={selectedDate}
        onFetchTasks={handleFetchTasks}
        selectedTask={selectedTask ?? null}
        action={taskAction}
        handleTaskDelete={handleTaskDelete}
      />
      <Toast
        notifications={notifications}
        autoDelete={true}
        autoDeleteTime={3000}
        position={"bottom-right"}
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
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerInfoContainer}>
          <h3>{APP_NAME}</h3>
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
          <LogoutIcon
            onClick={onClickLogout}
            size={24}
            className={styles.icon}
          />
        </div>
      </div>
    </>
  );
};
