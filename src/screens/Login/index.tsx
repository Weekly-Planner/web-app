import { useFormik } from "formik";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import PasswordIcon from "../../components/PasswordIcon";
import TextInput from "../../components/TextInput";

import { LOGIN_VALIDATION } from "../../constants/validations";
import styles from "../../global/styles/Auth.module.css";

interface ILoginForm {
  email: string;
  password: string;
}

const initialValues: ILoginForm = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema: LOGIN_VALIDATION,
  });

  const togglePasswordVisibility = () =>
    setPasswordVisibility((prevState: boolean) => !prevState);

  return (
    <Layout title="Login" isMenuDisplayed={false}>
      <div className={styles.main}>
        <a href={"/"} className={styles.crossContainer}>
          <RxCross2 size={24} className={styles.crossIcon} />
        </a>
        <div className={styles.leftContainer}>
          <img
            src={"/images/login.jpeg"}
            alt={
              "Goals diary laying on a blue desk next a tea cup with fancy pens"
            }
            className={styles.leftImage}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topContainer}>
            <h1 className={styles.title}>Weekly Planner</h1>
            <p>Welcome to Weekly Planner</p>
          </div>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
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
            <Button title="login" type="submit" />
          </form>
          <div className={styles.bottomContainer}>
            <div className={styles.orContainer}>
              <div className={styles.orLine} />
              <p className={styles.orText}>or</p>
              <div className={styles.orLine} />
            </div>
            <p>
              New Planner?{" "}
              <a className={styles.signup} href={"/signup"}>
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
