import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "../features/game/gameSlice";
import introReducer from "../features/intro/introSlice";

const store = configureStore({
  reducer: {
    intro: introReducer,
    game: gameReducer,
  },
});

export default store;
