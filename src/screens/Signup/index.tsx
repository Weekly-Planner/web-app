import { useFormik } from "formik";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../../components/Button";
import PasswordIcon from "../../components/PasswordIcon";
import TextInput from "../../components/TextInput";
import { SIGNUP_VALIDATION } from "../../constants/validations";
import styles from "../../global/styles/Auth.module.css";

interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const initialValues: ISignupForm = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function Signup() {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema: SIGNUP_VALIDATION,
  });

  const togglePasswordVisibility = () =>
    setPasswordVisibility((prevState: boolean) => !prevState);

  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisibility((prevState: boolean) => !prevState);

  return (
    <div className={styles.main}>
      <a href={"/"} className={styles.crossContainer}>
        <RxCross2 size={24} className={styles.crossIcon} />
      </a>
      <div className={styles.leftContainer}>
        <img
          src={"/images/signup.jpeg"}
          alt={
            "A sand color book with a title of Focus sitting a table with a graph pattern"
          }
          className={styles.leftImage}
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>Weekly Planner</h1>
          <p className={styles.subtitle}>
            Become a member of the planners
            <br />
            who achieve more in less time
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextInput
            placeholder="Full Name"
            id="name"
            name="name"
            type="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <TextInput
            placeholder="Email Address"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <TextInput
            placeholder="Password"
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            icon={
              <PasswordIcon
                visibility={isPasswordVisible}
                onClick={togglePasswordVisibility}
              />
            }
          />

          <TextInput
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
            icon={
              <PasswordIcon
                visibility={isConfirmPasswordVisible}
                onClick={toggleConfirmPasswordVisibility}
              />
            }
          />
          <Button title="Signup" type="submit" />
        </form>
        <div className={styles.bottomContainer}>
          <div className={styles.orContainer}>
            <div className={styles.orLine} />
            <p className={styles.orText}>or</p>
            <div className={styles.orLine} />
          </div>
          <p>
            Already a Member?{" "}
            <a className={styles.signup} href={"/login"}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
