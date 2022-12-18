import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FormikHelpers, useFormik } from "formik";
import moment, { Moment } from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import { useAuth } from "../../contexts/AuthProvider";
import { firestore } from "../../services/firebase";
import styles from "./index.module.css";
import Select from "react-select";
import { TaskItemType } from "../../constants/utils";
import { TASK_VALIDATION } from "../../constants/validations";

export enum TaskStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  BLOCKED = "blocked",
}

export enum TaskActions {
  ADD = "add",
  EDIT = "edit",
}

interface ITaskDetails {
  isVisible: boolean;
  onDismiss: () => void | Promise<void> | undefined;
  onFetchTasks: (
    title: string,
    action: TaskActions
  ) => void | Promise<void> | undefined;
  selectedDate: Moment | null;
  selectedTask: TaskItemType | null;
  action: TaskActions;
  handleTaskDelete: (
    id: string | undefined
  ) => void | Promise<void> | undefined;
}

type AddTaskFormTypes = {
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
};

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const categories = [
  { value: "personal", label: "Personal" },
  { value: "professional", label: "Professional" },
];

const statuses = [
  { value: TaskStatus.ACTIVE, label: "Active" },
  { value: TaskStatus.BLOCKED, label: "Blocked" },
  { value: TaskStatus.COMPLETED, label: "Completed" },
  { value: TaskStatus.PENDING, label: "Pending" },
];

const TaskDetails: React.FC<ITaskDetails> = ({
  isVisible,
  onDismiss,
  selectedDate,
  onFetchTasks,
  action = TaskActions.ADD,
  selectedTask,
  handleTaskDelete,
}) => {
  const { currentUser } = useAuth();

  const initialValues: AddTaskFormTypes = {
    title: selectedTask?.title ?? "",
    description: selectedTask?.description ?? "",
    priority: selectedTask?.priority ?? "",
    category: selectedTask?.category ?? "",
    status: selectedTask?.status ?? "",
  };

  async function handleAddTask(
    values: AddTaskFormTypes,
    actions: FormikHelpers<AddTaskFormTypes>
  ) {
    try {
      const taskObj = {
        ...values,
        description: values.description.trim(),
        title: values.title.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        day: moment(selectedDate).toISOString(),
        status: values.status,
      };
      await addDoc(
        collection(firestore, `users/${currentUser?.uid}/tasks`),
        taskObj
      );
      actions.resetForm();
      onFetchTasks(taskObj.title, action);
    } catch (err) {
      console.log({ err });
    } finally {
      actions.setSubmitting(false);
    }
  }

  async function handleUpdateTask(
    values: AddTaskFormTypes,
    actions: FormikHelpers<AddTaskFormTypes>
  ) {
    try {
      const updatedTaskObj = {
        ...values,
        description: values.description.trim(),
        title: values.title.trim(),
        updatedAt: new Date(),
        status: values.status,
      };
      await updateDoc(
        doc(firestore, `users/${currentUser?.uid}/tasks/${selectedTask?.id}`),
        updatedTaskObj
      );
      actions.resetForm();
      onFetchTasks(updatedTaskObj.title, action);
    } catch (err) {
      console.log({ err });
    } finally {
      actions.setSubmitting(false);
    }
  }

  async function handleSubmit(
    values: AddTaskFormTypes,
    actions: FormikHelpers<AddTaskFormTypes>
  ) {
    actions.setSubmitting(true);
    try {
      if (action === TaskActions.ADD) {
        // Add the task to DB
        await handleAddTask(values, actions);
      } else if (
        action === TaskActions.EDIT &&
        selectedTask &&
        selectedTask.id
      ) {
        // Update the task in DB
        await handleUpdateTask(values, actions);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: TASK_VALIDATION,
  });

  if (!isVisible) {
    return null;
  }

  function handleModalDismiss() {
    formik.resetForm();
    onDismiss();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.contentContainer}>
            <div className={styles.header}>
              <AiOutlineArrowLeft
                className={styles.backNav}
                onClick={handleModalDismiss}
              />
              <h4 className={styles.title}>
                {action === TaskActions.ADD ? (
                  <span>
                    Add a task for{" "}
                    {selectedDate
                      ? moment(selectedDate).format(DATE_TIME_FORMAT)
                      : ""}
                  </span>
                ) : (
                  <span>
                    Edit the task for{" "}
                    {selectedTask && selectedTask.day
                      ? moment(selectedTask.day).format(DATE_TIME_FORMAT)
                      : ""}
                  </span>
                )}
              </h4>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <TextInput
                placeholder="Task Title"
                name="title"
                id="title"
                onChange={formik.handleChange}
                error={formik.errors.title}
                value={formik.values.title}
                defaultValue={formik.initialValues.title}
              />
              <TextInput
                placeholder="Task Description"
                name="description"
                id="description"
                onChange={formik.handleChange}
                error={formik.errors.description}
                value={formik.values.description}
                paragraph={4}
                defaultValue={formik.initialValues.description}
              />
              <div className={styles.dropdownContainer}>
                <Select
                  options={priorities}
                  placeholder={"Select Priority"}
                  className={styles.dropdown}
                  onChange={(e) => formik.setFieldValue("priority", e?.value)}
                  onBlur={formik.handleBlur}
                  name={"priority"}
                  defaultValue={priorities.find(
                    (item) => item.value === formik.initialValues.priority
                  )}
                  value={priorities.find(
                    (item) => item.value === formik.values.priority
                  )}
                />
                <Select
                  options={categories}
                  placeholder={"Select Category"}
                  className={styles.dropdown}
                  onChange={(e) => formik.setFieldValue("category", e?.value)}
                  onBlur={formik.handleBlur}
                  name={"category"}
                  defaultValue={categories.find(
                    (item) => item.value === formik.initialValues.category
                  )}
                  value={categories.find(
                    (item) => item.value === formik.values.category
                  )}
                />
              </div>
              <div className={styles.dropdownContainer}>
                <Select
                  options={statuses}
                  placeholder={"Select Task Status"}
                  className={styles.dropdown}
                  onChange={(e) => formik.setFieldValue("status", e?.value)}
                  onBlur={formik.handleBlur}
                  name={"status"}
                  defaultValue={statuses.find(
                    (item) => item.value === formik.initialValues.status
                  )}
                  value={statuses.find(
                    (item) => item.value === formik.values.status
                  )}
                />
              </div>
              <div className={styles.actionContainer}>
                {action === TaskActions.EDIT ? (
                  <Button
                    className={styles.deleteAction}
                    title={"Delete"}
                    onClick={() => handleTaskDelete(selectedTask?.id)}
                  />
                ) : null}
                <Button
                  title={action === TaskActions.ADD ? "Add" : "Update"}
                  type={"submit"}
                  disabled={
                    formik.isSubmitting ||
                    formik.values.title.length === 0 ||
                    formik.values.description.length === 0 ||
                    formik.values.priority.length === 0 ||
                    formik.values.status.length === 0 ||
                    formik.values.status.length === 0
                  }
                />
              </div>
            </form>
          </div>
        </div>
        <div className={styles.background} onClick={handleModalDismiss} />
      </div>
    </div>
  );
};

export default TaskDetails;
