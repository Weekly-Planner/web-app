import { DATE_TIME_FORMAT } from "./datetime";
import moment, { Moment } from "moment";
import { nanoid } from "nanoid";
import { ToastType } from "../components/Toast";
import { Timestamp } from "firebase/firestore";

export type TaskItemType = {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  day: Moment | string;
  priority: string;
  status: string;
};

export type DayItemType = {
  day: Moment;
  tasks: TaskItemType[];
};

export const APP_NAME = "Weekly Planner";

export function generateData(tasks: any[]) {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const today = moment().add(i, "day");
    const todayFormatted = moment(today).format(DATE_TIME_FORMAT);
    data.push({
      day: today,
      tasks: tasks
        .filter((task) => {
          const taskDay = moment(task.day).format(DATE_TIME_FORMAT);
          return todayFormatted === taskDay;
        })
        .sort((a, b) => (a.createdAt.toDate() > b.createdAt.toDate() ? 1 : -1)),
    });
  }
  return data;
}

export type NotificationType = "success" | "info" | "warning" | "error";
export function generateNotification(
  type: NotificationType,
  title: string,
  description?: string | undefined
): ToastType {
  return {
    id: nanoid(),
    title,
    description: description ?? "",
    icon: `/icons/${type}.svg`,
    type,
  };
}
