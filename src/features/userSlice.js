import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token", "email", "isLogin"],
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    email: "",
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLogin = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = "";
      state.isLogin = false;
      state.email = "";
    },
    switchMode: (state) => {
      state.isLogin = !state.isLogin;
    },
    signup: (state, action) => {
      state.token = action.payload.token;
      state.isLogin = true;
      state.email = action.payload.email;
    },
  },
});

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

export default persistedAuthReducer;

export const { login, logout, switchMode, signup } = authSlice.actions;
