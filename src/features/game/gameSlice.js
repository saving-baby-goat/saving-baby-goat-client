import { createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "../../common/util/constants";

export const initialState = {
  gameLevel: LEVEL.EASY,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameLevel: (state, action) => {
      state.gameLevel = action.payload;
    },
  },
});

export const { setGameLevel } = gameSlice.actions;

export default gameSlice.reducer;
