import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  nickname: "",
};

export const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

export const { setNickname } = introSlice.actions;

export default introSlice.reducer;
