import css from "./Notification.module.css";

const Notification = ({ title }) => {
  return <p className={css.notification}>{title}</p>;
};

export default Notification;
