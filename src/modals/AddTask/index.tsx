import moment, { Moment } from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { DATE_TIME_FORMAT } from "../../constants/datetime";
import styles from "./index.module.css";

interface IAddTask {
  isVisible: boolean;
  onDismiss: () => void | Promise<void> | undefined;
  selectedDate: Moment | null;
}

const AddTask: React.FC<IAddTask> = ({
  isVisible,
  onDismiss,
  selectedDate,
}) => {
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
            <TextInput
              placeholder="Task Title"
              onChange={() => {}}
              error={""}
            />
            <TextInput
              placeholder="Task Description"
              onChange={() => {}}
              error={""}
              paragraph={3}
            />
            <Button title="Add" type={"submit"} />
          </div>
        </div>
        <div className={styles.background} onClick={onDismiss} />
      </div>
    </div>
  );
};

export default AddTask;
