import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import groupReducer from "./slices/groupSclice";

const rootReducer = {
  auth: authReducer,
  //   tasks: taskReducer,
  groups: groupReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
