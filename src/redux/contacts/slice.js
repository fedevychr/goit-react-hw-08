import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./operations";
import { logOut } from "../auth/operations";

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  isError: null,
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу (Anoteher variant initialState: {items: []})
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів
  extraReducers: (builder) =>
    builder
      //Return all contacts
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })

      //Add contact
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })

      //Delete contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      })

      //Update contact
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;

        //Furst variant
        state.contacts = state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
      })

      //LogOut
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
      })

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      ),
});

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
