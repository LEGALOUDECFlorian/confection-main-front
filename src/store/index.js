// Créer un store avec un reducer
import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/user.js";

const store = configureStore({
  reducer: {
    user: userLoginReducer,
  },
});

export default store;
