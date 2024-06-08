import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
// import { nanoid } from "nanoid";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import css from "./AddContactForm.module.css";

const contactUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Too short!")
    .max(50, "Too long!"),
  number: Yup.string()
    .required("Number is required!")
    .min(3, "Too short!")
    .max(50, "Too long!"),
});

const FORM_INITIAL_VALUES = {
  name: "",
  number: "",
};

const AddContactForm = () => {
  const dispatch = useDispatch();

  //Функція для збору інформації з форми
  const handeSubmit = (value, actions) => {
    dispatch(addContact(value));
    actions.resetForm();
  };

  return (
    <Formik
      onSubmit={handeSubmit}
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={contactUserSchema}
    >
      <Form className={css.container}>
        <label>
          <span>Name</span>
          <br />
          <Field type="text" name="name" placeholder="Enter contact's name" />
          <ErrorMessage component="p" name="name" className={css.error} />
        </label>
        <label>
          <span>Number</span>
          <br />
          <Field
            type="text"
            name="number"
            placeholder="Enter contact's number"
          />
          <ErrorMessage component="p" name="number" className={css.error} />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default AddContactForm;
