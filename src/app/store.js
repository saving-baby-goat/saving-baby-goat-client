import { configureStore } from "@reduxjs/toolkit";

import socketMiddleware from "../common/middlewares/socketMiddleware";
import gameReducer from "../features/game/gameSlice";
import introReducer from "../features/intro/introSlice";

const store = configureStore({
  reducer: {
    intro: introReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
