import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import css from "./RegistrationForm.module.css";

const registrationUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(2, "User name must be greater than 1 character!")
    .max(30, "User name must be less than 30 characters!"),
  email: Yup.string()
    .email("You must enter valid email address!")
    .required("Email address is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(7, "Your password must be greater than 7 characters!"),
});

const FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const dispatch = useDispatch();

  //Функція для збору інформації з форми
  const handleSubmit = (value, actions) => {
    // onAddContact(value);
    dispatch(register(value));
    actions.resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={registrationUserSchema}
      autoComplete="on"
    >
      <Form className={css.container}>
        <h2>Register user</h2>
        <label>
          <span>Name</span>
          <br />
          <Field
            type="text"
            name="name"
            placeholder="Enter name"
            autoComplete="name"
          />
          <ErrorMessage component="p" name="name" className={css.error} />
        </label>
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
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
