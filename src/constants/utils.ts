import moment, { Moment } from "moment";

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
const items = [0, 1];
const fakeTaskItem = {
  id: "0",
  title: "Lorem Ipsum",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  createdAt: moment(),
};
const fakeTasks = items.map((item) => {
  return {
    ...fakeTaskItem,
    id: String(item),
  };
});

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
