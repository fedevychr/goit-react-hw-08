import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectPhoneBookIsError,
  selectPhoneBookIsLoading,
} from "../../redux/contacts/selectors";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
import Contact from "../../components/Contact/Contact";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";

import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectPhoneBookIsLoading);
  const isError = useSelector(selectPhoneBookIsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.contactContainer}>
      <AddContactForm />
      <SearchBox />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul className={css.listContact}>
        {Array.isArray(contacts) && contacts.length === 0 && (
          <li>You don&apos;t have any added contacts yet!</li>
        )}
        {Array.isArray(contacts) &&
          contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />;
          })}
      </ul>
    </div>
  );
};

export default ContactsPage;
