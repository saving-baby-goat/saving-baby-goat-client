import { createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "../../common/util/constants";
import { createNodelist } from "../../common/util/node";

export const currentGameStateOpstion = {
  PLAYER_1_TURN: "plyaer1Turn",
  PLAYER_2_TURN: "plyaer2Turn",
  WAITING: "waiting",
  START: "start",
};

export const initialState = {
  gameLevel: LEVEL.EASY,
  nodeList: {
    byId: {},
    allIds: [[]],
  },
  moveCount: 0,
  player1StartNodeId: "",
  player2StartNodeId: "",
  currentGameRoomId: "",
  player1Nickname: "",
  player2Nickname: "",
  player1SocketId: "",
  player2SocketId: "",
  currentGameState: "",
  currentPlayerSocketId: "",
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
    setCurrentPlayerSocketId: (state, action) => {
      state.currentPlayerSocketId = action.payload;
    },
    setGameInfo: (state, action) => {
      const {
        currentGameRoomId,
        player1Nickname,
        player2Nickname,
        player1SocketId,
        player2SocketId,
      } = action.payload;

      state.currentGameRoomId = currentGameRoomId;
      state.player1Nickname = player1Nickname;
      state.player2Nickname = player2Nickname;
      state.player1SocketId = player1SocketId;
      state.player2SocketId = player2SocketId;
      state.currentGameState = currentGameStateOpstion.START;
    },
    setWaitingStatus: (state) => {
      state.currentGameState = currentGameStateOpstion.WAITING;
    },
    setMapEqual: (state, action) => {
      state.nodeList = action.payload;
    },
    changeCurrentGameState: (state, action) => {
      state.currentGameState = action.payload;
    },
  },
});

export const {
  setGameLevel,
  createGame,
  setNodeState,
  onRollDice,
  setGameInfo,
  setWaitingStatus,
  setCurrentPlayerSocketId,
  setMapEqual,
  changeCurrentGameState,
} = gameSlice.actions;

export default gameSlice.reducer;
