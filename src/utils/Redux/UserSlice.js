// "use client"
import { createSlice } from "@reduxjs/toolkit";

// Just define the initial state without fetching from Cookies
const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, updateUser, clearUser, setLoading } = UserSlice.actions;
export default UserSlice.reducer;
