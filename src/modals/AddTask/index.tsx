import { addDoc, collection } from "firebase/firestore";
import { FormikHelpers, useFormik } from "formik";
import moment, { Moment } from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import { useAuth } from "../../contexts/AuthProvider";
import { firestore } from "../../services/firebase";
import styles from "./index.module.css";

interface IAddTask {
  isVisible: boolean;
  onDismiss: () => void | Promise<void> | undefined;
  selectedDate: Moment | null;
}

type AddTaskFormTypes = {
  title: string;
  description: string;
};

const initialValues: AddTaskFormTypes = {
  title: "",
  description: "",
};

const AddTask: React.FC<IAddTask> = ({
  isVisible,
  onDismiss,
  selectedDate,
}) => {
  const { currentUser } = useAuth();

  async function handleSubmit(
    values: AddTaskFormTypes,
    actions: FormikHelpers<AddTaskFormTypes>
  ) {
    const taskObj = {
      title: values.title.trim(),
      description: values.description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      day: selectedDate,
    };

    await addDoc(
      collection(firestore, `users/${currentUser?.uid}/tasks`),
      taskObj
    );
    onDismiss();
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.contentContainer}>
            <div className={styles.header}>
              <AiOutlineArrowLeft
                className={styles.backNav}
                onClick={onDismiss}
              />
              <h4 className={styles.title}>
                Add a task for{" "}
                {selectedDate
                  ? moment(selectedDate).format(DATE_TIME_FORMAT)
                  : moment().format(DATE_TIME_FORMAT)}
              </h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextInput
                placeholder="Task Title"
                name="title"
                id="title"
                onChange={formik.handleChange}
                error={formik.errors.title}
              />
              <TextInput
                placeholder="Task Description"
                name="description"
                id="description"
                onChange={formik.handleChange}
                error={formik.errors.description}
                paragraph={3}
              />
              <Button title="Add" type={"submit"} />
            </form>
          </div>
        </div>
        <div className={styles.background} onClick={onDismiss} />
      </div>
    </div>
  );
};

export default AddTask;
