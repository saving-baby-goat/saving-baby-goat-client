import { configureStore } from "@reduxjs/toolkit";

import socketMiddleware from "../common/middlewares/socketMiddleware";
import customMapReducer from "../features/customMap/customMapSlice";
import gameReducer from "../features/game/gameSlice";
import introReducer from "../features/intro/introSlice";

const store = configureStore({
  reducer: {
    intro: introReducer,
    game: gameReducer,
    customMap: customMapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
