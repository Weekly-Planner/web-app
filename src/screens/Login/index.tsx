import { AuthErrorCodes } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import PasswordIcon from "../../components/PasswordIcon";
import TextInput from "../../components/TextInput";

import { LOGIN_VALIDATION } from "../../constants/validations";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "../../global/styles/Auth.module.css";
import { firestore } from "../../services/firebase";

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
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    values: ILoginForm,
    actions: FormikHelpers<ILoginForm>
  ) => {
    try {
      const user = await login(values.email.trim(), values.password);
      if (!user) {
        throw new Error(AuthErrorCodes.USER_DELETED);
      }
      const docRef = doc(firestore, "users", user.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("firestore/document-not-found");
      }
      const userObj = docSnap.data();
      sessionStorage.setItem("USER", JSON.stringify(userObj));
      navigate("/dashboard");
    } catch (err: any) {
      console.error({ err });
      if (err.message === "firestore/document-not-found") {
        actions.setFieldError("email", "Contact Customer Support");
        return;
      }
      switch (err.code) {
        case AuthErrorCodes.USER_DELETED:
        case AuthErrorCodes.INVALID_PASSWORD:
          actions.setErrors({
            email: "Invalid Credentials",
            password: "Invalid Credentials",
          });
          break;
        case AuthErrorCodes.USER_DISABLED:
          actions.setFieldError("email", "Contact Customer Support");
          break;
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
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
            src={"/images/login.webp"}
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
