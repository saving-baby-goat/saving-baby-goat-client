import { createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "../../common/util/constants";
import { createNodelist } from "../../common/util/node";

export const initialState = {
  gameLevel: LEVEL.EASY,
  nodeList: {
    byId: {},
    allIds: [[]],
  },
  moveCount: 0,
  player1StartNodeId: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameLevel: (state, action) => {
      state.gameLevel = action.payload;
    },
    createGame: (state) => {
      const heightCount = 15;
      const widthCount = 31;
      state.nodeList = createNodelist(heightCount, widthCount);
    },
    setNodeState: (state, action) => {
      const { nodeId, nodeState, isStart } = action.payload;

      state.nodeList.byId[nodeId].nodeState = nodeState;
      state.moveCount--;
      if (isStart) {
        state.player1StartNodeId = nodeId;
      }
    },
    onRollDice: (state, action) => {
      if (!state.moveCount) {
        state.moveCount = action.payload;
      }
    },
  },
});

export const { setGameLevel, createGame, setNodeState, onRollDice } =
  gameSlice.actions;

export default gameSlice.reducer;
