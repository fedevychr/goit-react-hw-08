import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

//Create token
export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

//Clear token
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

//Create a new user
export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/signup", formData);
      // After successful registration, add the token to the HTTP header
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Login users
export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      // After successful registration, add the token to the HTTP header
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Logout users
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("/users/logout");
    // After a successful logout, remove the token from the HTTP header setToken(data.token);
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//refreshUser
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); // Return all states of the Aplication
    const token = state.auth.token;

    if (token === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setToken(token); //Set token in the header of the axios's instance in the field authorization
      const { data } = await instance.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
