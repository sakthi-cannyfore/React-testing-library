import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});
