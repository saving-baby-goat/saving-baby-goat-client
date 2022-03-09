import { createSlice } from "@reduxjs/toolkit";

import { BOARD_SIZE, NODE_STATE } from "../../common/util/constants";
import createNewCustomMap from "../../common/util/customMap";

export const initialState = {
  nodeList: {
    byId: {},
    allIds: [[]],
  },
  currentSelectorState: NODE_STATE.MINERAL,
  isGoatOnBoard: false,
};

export const customMapSlice = createSlice({
  name: "customMap",
  initialState,
  reducers: {
    setCustomMap: (state) => {
      const heightCount = BOARD_SIZE.HEIGHT_COUNT;
      const widthCount = BOARD_SIZE.WIDTH_COUNT;
      state.nodeList = createNewCustomMap(heightCount, widthCount);
    },
    setCurrnetSelectorState: (state, action) => {
      state.currentSelectorState = action.payload;
    },
    setCurrnetNodeState: (state, action) => {
      const { nodeId, currentSelectorState } = action.payload;

      if (state.nodeList.byId[nodeId].nodeState === currentSelectorState) {
        state.nodeList.byId[nodeId].nodeState = NODE_STATE.DEFAULT;

        if (currentSelectorState === NODE_STATE.GOAT) {
          state.isGoatOnBoard = false;
        }

        return;
      }

      if (currentSelectorState === NODE_STATE.GOAT) {
        if (state.isGoatOnBoard) {
          return;
        }

        state.isGoatOnBoard = true;
      }

      if (state.nodeList.byId[nodeId].nodeState === NODE_STATE.GOAT) {
        state.isGoatOnBoard = false;
      }

      state.nodeList.byId[nodeId].nodeState = currentSelectorState;
    },
    setStateInitialization: (state) => {
      state.nodeList = {
        byId: {},
        allIds: [[]],
      };
      state.currentSelectorState = NODE_STATE.MINERAL;
      state.isGoatOnBoard = false;
    },
  },
});

export const {
  setCustomMap,
  setCurrnetSelectorState,
  setCurrnetNodeState,
  setStateInitialization,
} = customMapSlice.actions;

export default customMapSlice.reducer;
