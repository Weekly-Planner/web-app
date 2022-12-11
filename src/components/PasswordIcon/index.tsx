import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "../../global/styles/Auth.module.css";

interface IPasswordIcon {
  visibility: boolean;
  onClick: () => void | undefined;
}

const PasswordIcon: React.FC<IPasswordIcon> = ({ visibility, onClick }) => {
  return visibility ? (
    <AiFillEyeInvisible onClick={onClick} size={24} className={styles.icon} />
  ) : (
    <AiFillEye onClick={onClick} size={24} className={styles.icon} />
  );
};

export default PasswordIcon;
