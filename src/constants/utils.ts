import { DATE_TIME_FORMAT } from "./datetime";
import moment, { Moment } from "moment";
import { nanoid } from "nanoid";
import { ToastType } from "../components/Toast";

type TaskItemType = {
  id: string;
  title: string;
  description: string;
  createdAt: Moment | string;
};

type DayItemType = {
  day: Moment;
  tasks: TaskItemType[];
};

export function getDays(): DayItemType[] {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const today = moment().add(i, "day");
    days.push({
      day: today,
      tasks: [],
    });
  }
  return days;
}

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

type NotificationType = "success" | "info" | "warning" | "error";
export function generateNotification(
  type: NotificationType,
  title: string,
  description: string
): ToastType {
  return {
    id: nanoid(),
    title,
    description,
    icon: `/icons/${type}.svg`,
    type,
  };
}
