import { createSlice } from "@reduxjs/toolkit";

import {
  BOARD_SIZE,
  CURRNET_GAME_STATE_OPTIONS,
  LEVEL,
  NODE_STATE,
} from "../../common/util/constants";
import {
  findGoatNodeId,
  findStartNodeId,
  findMineralNodeIdList,
  findShortestPath,
  createNodelist,
} from "../../common/util/game";

export const initialState = {
  gameLevel: LEVEL.EASY,
  isGameOver: false,
  isGameConnected: false,
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
  player1MineralCount: 0,
  player2MineralCount: 0,
  mineralNodeIdList: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameLevel: (state, action) => {
      state.gameLevel = action.payload;
      state.isGameConnected = true;
    },
    createGame: (state, action) => {
      const heightCount = BOARD_SIZE.HEIGHT_COUNT;
      const widthCount = BOARD_SIZE.WIDTH_COUNT;
      const level = action.payload;

      state.nodeList = createNodelist(heightCount, widthCount, level);

      state.mineralNodeIdList = findMineralNodeIdList(state.nodeList);
    },
    setStartNodeId: (state, action) => {
      if (state.currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        state.player1StartNodeId = action.payload;
      }

      if (state.currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
        state.player2StartNodeId = action.payload;
      }
    },
    setMineralNodeIdList: (state, action) => {
      state.mineralNodeIdList = action.payload;
    },
    setNodeState: (state, action) => {
      const { nodeId, isStart, currentGameState, option } = action.payload;

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        if (isStart) {
          state.player1StartNodeId = nodeId;
          state.nodeList.byId[nodeId].isStartPath = true;
        }

        if (option === NODE_STATE.BOMB) {
          state.nodeList.byId[nodeId].nodeState = NODE_STATE.EXPLODED_BOMB;
        } else {
          state.nodeList.byId[nodeId].nodeState = NODE_STATE.PLAYER_1_PATH;
        }
      }

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
        if (isStart) {
          state.player2StartNodeId = nodeId;
          state.nodeList.byId[nodeId].isStartPath = true;
        }

        if (option === NODE_STATE.BOMB) {
          state.nodeList.byId[nodeId].nodeState = NODE_STATE.EXPLODED_BOMB;
        } else {
          state.nodeList.byId[nodeId].nodeState = NODE_STATE.PLAYER_2_PATH;
        }
      }

      // 확인 : 0초과 아니어도 되는지
      if (state.moveCount > 0) {
        state.moveCount--;
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
        level,
      } = action.payload;

      state.currentGameRoomId = currentGameRoomId;
      state.player1Nickname = player1Nickname;
      state.player2Nickname = player2Nickname;
      state.player1SocketId = player1SocketId;
      state.player2SocketId = player2SocketId;
      state.currentGameState = CURRNET_GAME_STATE_OPTIONS.START;
      state.isGameOver = false;

      if (currentGameRoomId.slice(5) === currnetPlayerSocketId) {
        state.isMyTurn = true;
      }

      if (
        level === LEVEL.CUSTOM_MAP &&
        player1SocketId === currnetPlayerSocketId
      ) {
        state.isMyTurn = true;
        state.currentGameState = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;
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

      const startNodeId = findStartNodeId(state.nodeList, currentGameState);
      const goatNodeId = findGoatNodeId(state.nodeList);

      const shortestPath = findShortestPath(
        state.nodeList,
        state.mineralNodeIdList,
        startNodeId,
        goatNodeId
      ).flat();

      for (let i = 0; i < shortestPath.length; i++) {
        const targetId = shortestPath[i].id;
        state.nodeList.byId[targetId].nodeState = NODE_STATE.SHORTEST_PATH;
      }
    },
    userLeftGame: (state) => {
      state.gameLevel = LEVEL.EASY;
      state.isGameConnected = false;
      state.nodeList = {
        byId: {},
        allIds: [[]],
      };
      state.isGameOver = false;
      state.moveCount = 0;
      state.isMyTurn = false;
      state.mySocketId = "";
      state.player1StartNodeId = "";
      state.player2StartNodeId = "";
      state.player1Nickname = "";
      state.player2Nickname = "";
      state.currentGameRoomId = "";
      state.player1SocketId = "";
      state.player2SocketId = "";
      state.currentGameState = "";
      state.player1MineralCount = 0;
      state.player2MineralCount = 0;
      state.mineralNodeIdList = [];
    },
    setCustomNodeList: (state, action) => {
      state.nodeList = action.payload;
      state.mineralNodeIdList = findMineralNodeIdList(state.nodeList);
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
  setMineralNodeIdList,
  userLeftGame,
  setStartNodeId,
  setCustomNodeList,
} = gameSlice.actions;

export default gameSlice.reducer;
