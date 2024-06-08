import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

const loginUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("You must enter valid email address!")
    .required("Email address is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(7, "Your password must be greater than 7 characters!"),
});

const FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  //Функція для збору інформації з форми
  const handeSubmit = (value, actions) => {
    dispatch(logIn(value));
    actions.resetForm();
  };

  return (
    <Formik
      onSubmit={handeSubmit}
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={loginUserSchema}
      autoComplete="on"
    >
      <Form className={css.container}>
        <h2>Login user</h2>
        <label>
          <span>Email</span>
          <br />
          <Field
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="email"
          />
          <ErrorMessage component="p" name="email" className={css.error} />
        </label>
        <label>
          <span>Password</span>
          <br />
          <Field
            type="password"
            name="password"
            placeholder="Enter password"
            autoComplete="current-password"
          />
          <ErrorMessage component="p" name="password" className={css.error} />
        </label>
        <button type="submit">Log in</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
