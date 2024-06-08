import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  //Additional state values
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів
  extraReducers: (builder) =>
    builder
      //REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user; // Return register thunk from return data (see redux -> auth -> operations)
        state.token = action.payload.token; // Return register thunk
      })

      //LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user; // Return login thunk from return data (see redux -> auth -> operations)
        state.token = action.payload.token; // Return login thunk
      })

      //LOGOUT
      .addCase(logOut.fulfilled, () => {
        // state.isLoading = false;
        // state.isLoggedIn = false;
        // state.user = INITIAL_STATE.user; // second variant: { name: null, email: null }
        // state.token = null;

        //Second variant
        return INITIAL_STATE;
      })

      //REFRESH USER
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload; // second variant: { name: null, email: null }
      })

      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          logOut.pending,
          refreshUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          logOut.rejected,
          refreshUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

// Редюсер слайсу
export const authReducer = authSlice.reducer;
