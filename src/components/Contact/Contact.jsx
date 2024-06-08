import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

import css from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <li className={css.card}>
      <div className={css.wrapper}>
        <div className={css.info}>
          <FaUser />
          <p>{name}</p>
        </div>
        <div className={css.info}>
          <FaPhoneAlt />
          <p>{number}</p>
        </div>
      </div>
      <button className={css.button} onClick={handleDelete}>
        delete
      </button>
    </li>
  );
};

export default Contact;
