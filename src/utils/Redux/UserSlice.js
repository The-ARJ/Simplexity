// UserSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Import the cookie library

// Load initial state from cookies if available
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  isLoggedIn: !!Cookies.get("isLoggedIn"),
  loading: false, // Add loading property
};

const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false; // Set loading to false after user is set
      Cookies.set("user", JSON.stringify(action.payload));
      Cookies.set("isLoggedIn", "true");
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Cookies.remove("user");
      Cookies.remove("isLoggedIn");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, } = UserSlice.actions;
export default UserSlice.reducer;


