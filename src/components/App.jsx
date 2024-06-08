import { useDispatch } from "react-redux";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import PhoneBookContainer from "./PhoneBookContainer/PhoneBookContainer";
import SearchBox from "./SearchBox/SearchBox";
import { fetchContacts } from "../redux/contactsOps";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <PhoneBookContainer>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </PhoneBookContainer>
  );
}

export default App;
