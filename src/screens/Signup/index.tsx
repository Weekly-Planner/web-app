import { AuthErrorCodes, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import PasswordIcon from "../../components/PasswordIcon";
import TextInput from "../../components/TextInput";
import { SIGNUP_VALIDATION } from "../../constants/validations";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "../../global/styles/Auth.module.css";
import { auth, firestore } from "../../services/firebase";

type SignupFormTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const initialValues: SignupFormTypes = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState<boolean>(false);

  async function handleSubmit(
    values: SignupFormTypes,
    actions: FormikHelpers<SignupFormTypes>
  ) {
    try {
      const user = await signup(values.email.trim(), values.password.trim());
      const userObj = {
        email: values.email.trim(),
        name: values.name.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: user?.user.emailVerified,
        contact: user?.user.phoneNumber,
        avatar: user?.user.photoURL,
      };
      await setDoc(doc(firestore, `users/${user?.user.uid}`), userObj);
      sessionStorage.setItem("USER", JSON.stringify(userObj));
      navigate("/dashboard");
    } catch (err: any) {
      switch (err.code) {
        case AuthErrorCodes.USER_DELETED:
          actions.setErrors({
            email: "Invalid Credentials",
            password: "Invalid Credentials",
          });
          break;
        case AuthErrorCodes.USER_DISABLED:
          actions.setFieldError("email", "Contact Customer Support");
          break;
        case AuthErrorCodes.EMAIL_EXISTS:
          actions.setFieldError("email", "Account already exists. Login");
          break;
        default:
          console.error({ err });
          break;
      }
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SIGNUP_VALIDATION,
  });

  const togglePasswordVisibility = () =>
    setPasswordVisibility((prevState: boolean) => !prevState);

  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisibility((prevState: boolean) => !prevState);

  return (
    <Layout title="Become a Planner" isMenuDisplayed={false}>
      <div className={styles.main}>
        <a href={"/"} className={styles.crossContainer}>
          <RxCross2 size={24} className={styles.crossIcon} />
        </a>
        <div className={styles.leftContainer}>
          <img
            src={"/images/signup.webp"}
            alt={
              "A sand color book with a title of Focus sitting a table with a graph pattern"
            }
            className={styles.leftImage}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topContainer}>
            <h3 className={styles.title}>Weekly Planner</h3>
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
            <p>
              Already a Member?{" "}
              <a className={styles.signup} href={"/login"}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
