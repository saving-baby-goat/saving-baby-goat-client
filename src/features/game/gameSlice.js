/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";

import {
  BOARD_SIZE,
  CURRNET_GAME_STATE_OPTIONS,
  LEVEL,
  NODE_STATE,
} from "../../common/util/constants";
import { findShortestPath, findMineralNodeId } from "../../common/util/game";
import { createNodelist } from "../../common/util/node";

export const initialState = {
  gameLevel: LEVEL.EASY,
  isGameOver: false,
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
  // SHORTEST_PATH:"shortestPath";
  player1MineralCount: 0,
  player2MineralCount: 0,
  goatNodeId: "",
  mineralNodeIdList: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameLevel: (state, action) => {
      state.gameLevel = action.payload;
    },
    createGame: (state) => {
      const heightCount = BOARD_SIZE.HEIGHT_COUNT;
      const widthCount = BOARD_SIZE.WIDTH_COUNT;

      state.nodeList = createNodelist(heightCount, widthCount);
      state.goatNodeId = `${Math.floor(heightCount / 2)}-${Math.floor(
        widthCount / 2
      )}`;

      state.mineralNodeIdList = findMineralNodeId(state.nodeList);
    },
    setNodeState: (state, action) => {
      const { nodeId, nodeState, isStart, currentGameState } = action.payload;

      state.nodeList.byId[nodeId].nodeState = nodeState;

      if (state.moveCount > 0) {
        state.moveCount--;
      }

      if (isStart) {
        if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
          state.player1StartNodeId = nodeId;
        }
        if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
          state.player2StartNodeId = nodeId;
        }
      }
    },
    setStartNodeAndGoatId: (state, action) => {
      const { nodeId, goatNodeId, currentSocketId } = action.payload;

      if (currentSocketId === state.player1SocketId) {
        state.player2StartNodeId = nodeId;
      }

      if (currentSocketId === state.player2SocketId) {
        state.player1StartNodeId = nodeId;
      }

      state.goatNodeId = goatNodeId;
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
      state.currentGameState = CURRNET_GAME_STATE_OPTIONS.START;

      if (currentGameRoomId.split("-")[1] === currnetPlayerSocketId) {
        state.isMyTurn = true;
      }
    },
    setWaitingStatus: (state) => {
      state.currentGameState = CURRNET_GAME_STATE_OPTIONS.WAITING;
    },
    setMapEqual: (state, action) => {
      const { nodeList, currentSocketId } = action.payload;
      if (state.currentGameState === CURRNET_GAME_STATE_OPTIONS.START) {
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;
      }

      if (state.currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        if (currentSocketId === state.player2SocketId) {
          state.nodeList = nodeList;
        }
      }

      if (state.currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
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

      if (action.payload === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN;
      } else {
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;
      }
    },
    updateMineralCount: (state, action) => {
      if (action.payload === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        state.player1MineralCount++;
      }
      if (action.payload === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
        state.player2MineralCount++;
      }
    },
    updateCurrnetGameOver: (state, action) => {
      const currentGameState = action.payload;
      state.isGameOver = !state.isGameOver;
      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_WIN;
      }
      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_2_WIN;
      }
    },
    setShortestPath: (state, action) => {
      const currentGameState = action.payload;

      let path = {};

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_WIN) {
        path = findShortestPath(
          state.nodeList,
          state.player1StartNodeId,
          state.goatNodeId
        );
      }

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_WIN) {
        path = findShortestPath(
          state.nodeList,
          state.player2StartNodeId,
          state.goatNodeId
        );
      }

      for (let i = 0; i < path.length; i++) {
        const targetId = path[i].id;
        state.nodeList.byId[targetId].nodeState = NODE_STATE.SHORTEST_PATH;
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
  updateMineralCount,
  updateCurrnetGameOver,
  setShortestPath,
  setStartNodeAndGoatId,
} = gameSlice.actions;

export default gameSlice.reducer;
