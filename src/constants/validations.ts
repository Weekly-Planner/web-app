import * as Yup from "yup";

export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SIGNUP_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Enter your password again")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  name: Yup.string().required("Full name is required"),
});

export const TASK_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  category: Yup.string().required("Cateogry is required"),
  status: Yup.string().required("Status is required"),
});
