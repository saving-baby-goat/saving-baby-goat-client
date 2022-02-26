import { configureStore } from "@reduxjs/toolkit";

import introReducer from "../features/intro/introSlice";

const store = configureStore({
  reducer: {
    intro: introReducer,
  },
});

export default store;
