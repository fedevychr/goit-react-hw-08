import { createSelector } from "@reduxjs/toolkit";
import { selectPhoneBookContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filterContacts.name;

//Memomized selector
export const selectFilteredContacts = createSelector(
  [selectPhoneBookContacts, selectNameFilter],
  (contacts, name) => {
    if (Array.isArray(contacts)) {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(name.toLowerCase());
      });
    }
  }
);
