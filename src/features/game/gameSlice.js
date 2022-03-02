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
  isMyTurn: false,
  mySocketId: "",
  player1StartNodeId: "",
  player2StartNodeId: "",
  player1Nickname: "",
  player2Nickname: "",
  currentGameRoomId: "",
  player1SocketId: "",
  player2SocketId: "",
  currentGameState: "",
  // PLAYER_1_TURN: "plyaer1Turn",
  // PLAYER_2_TURN: "plyaer2Turn",
  // WAITING: "waiting",
  // START: "start",
  // currentPlayerSocketId: "",
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
      const { nodeId, nodeState, isStart, currentGameState } = action.payload;

      state.nodeList.byId[nodeId].nodeState = nodeState;
      state.moveCount--;

      if (isStart) {
        if (currentGameState === currentGameStateOpstion.PLAYER_1_TURN) {
          state.player1StartNodeId = nodeId;
        }
        if (currentGameState === currentGameStateOpstion.PLAYER_2_TURN) {
          state.player2StartNodeId = nodeId;
        }
      }
    },
    onRollDice: (state, action) => {
      if (!state.moveCount) {
        state.moveCount = action.payload;
      }
    },
    setMySocketId: (state, action) => {
      state.mySocketId = action.payload;
    },
    setGameInfo: (state, action) => {
      const {
        currentGameRoomId,
        player1Nickname,
        player2Nickname,
        player1SocketId,
        player2SocketId,
        currnetPlayerSocketId,
      } = action.payload;

      state.currentGameRoomId = currentGameRoomId;
      state.player1Nickname = player1Nickname;
      state.player2Nickname = player2Nickname;
      state.player1SocketId = player1SocketId;
      state.player2SocketId = player2SocketId;
      state.currentGameState = currentGameStateOpstion.START;

      if (currentGameRoomId.split("-")[1] === currnetPlayerSocketId) {
        state.isMyTurn = true;
      }
    },
    setWaitingStatus: (state) => {
      state.currentGameState = currentGameStateOpstion.WAITING;
    },
    setMapEqual: (state, action) => {
      const { nodeList, currentSocketId } = action.payload;
      if (state.currentGameState === currentGameStateOpstion.START) {
        state.currentGameState = currentGameStateOpstion.PLAYER_1_TURN;
      }

      if (state.currentGameState === currentGameStateOpstion.PLAYER_1_TURN) {
        if (currentSocketId === state.player2SocketId) {
          state.nodeList = nodeList;
        }
      }

      if (state.currentGameState === currentGameStateOpstion.PLAYER_2_TURN) {
        if (currentSocketId === state.player1SocketId) {
          state.nodeList = nodeList;
        }
      }
    },
    changeCurrentGameState: (state, action) => {
      state.currentGameState = action.payload;
    },
    changePlayerTurn: (state, action) => {
      state.isMyTurn = !state.isMyTurn;

      if (action.payload === currentGameStateOpstion.PLAYER_1_TURN) {
        state.currentGameState = currentGameStateOpstion.PLAYER_2_TURN;
      } else {
        state.currentGameState = currentGameStateOpstion.PLAYER_1_TURN;
      }
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
  setMySocketId,
  setMapEqual,
  changeCurrentGameState,
  changePlayerTurn,
} = gameSlice.actions;

export default gameSlice.reducer;
