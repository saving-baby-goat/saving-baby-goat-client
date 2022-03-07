/* eslint-disable import/no-cycle */
import { io } from "socket.io-client";

import {
  setGameInfo,
  setWaitingStatus,
  setMySocketId,
  setMapEqual,
  changePlayerTurn,
  updateMineralCount,
  updateCurrnetGameOver,
  setMineralNodeIdList,
  userLeftGame,
  setStartNodeId,
} from "../../features/game/gameSlice";

const socketActionType = {
  connected: "socket/connected",
  disconnected: "socket/disconnected",
  emit: "socket/emit",
};

const socketActionCreators = {
  socketConnected: (level, nickname) => ({
    type: socketActionType.connected,
    payload: {
      level,
      nickname,
    },
  }),
  socketDisconnected: (payload) => ({
    type: socketActionType.disconnected,
    payload,
  }),
  socketEmitted: (socketEvent, socketPayload) => ({
    type: socketActionType.emit,
    payload: {
      socketEvent,
      socketPayload,
    },
  }),
};

const socketMiddleware = () => {
  let socket = null;

  return (storeAPI) => (next) => (action) => {
    if (action.type === socketActionType.connected) {
      const { level, nickname } = action.payload;

      socket = io.connect(process.env.REACT_APP_AXIOS_BASE_URL);

      socket.emit("joinGameRoom", { level, nickname });

      socket.on("joinGameRoom", (gameRoomInfo) => {
        const currnetPlayerSocketId = socket.id;
        if (
          Object.prototype.hasOwnProperty.call(gameRoomInfo, "player2Nickname")
        ) {
          gameRoomInfo.currnetPlayerSocketId = currnetPlayerSocketId;
          storeAPI.dispatch(setGameInfo(gameRoomInfo));
        } else {
          storeAPI.dispatch(setWaitingStatus());
        }
        storeAPI.dispatch(setMySocketId(currnetPlayerSocketId));
      });

      socket.on("receiveNodeList", (nodeList) => {
        const currentSocketId = socket.id;
        storeAPI.dispatch(setMapEqual({ nodeList, currentSocketId }));
      });

      socket.on("receiveMineralNodeIdList", (mineralNodeIdList) => {
        storeAPI.dispatch(setMineralNodeIdList(mineralNodeIdList));
      });

      socket.on("receiveStartNodeId", (nodeId) => {
        storeAPI.dispatch(setStartNodeId(nodeId));
      });

      socket.on("receiveEndOfTurn", (currentGameState) => {
        storeAPI.dispatch(changePlayerTurn(currentGameState));
      });

      socket.on("receiveMineralCount", (currentGameState) => {
        storeAPI.dispatch(updateMineralCount(currentGameState));
      });

      socket.on("receiveGameOver", (currentGameState) => {
        storeAPI.dispatch(updateCurrnetGameOver(currentGameState));
      });

      socket.on("leaveGame", () => {
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log(`client socketid ${socket.id} is disconnected`);
        storeAPI.dispatch(userLeftGame());
      });
    }

    if (action.type === socketActionType.disconnected) {
      socket.disconnect();
    }

    if (action.type === socketActionType.emit) {
      socket.emit(action.payload.socketEvent, action.payload.socketPayload);
    }

    next(action);
  };
};

export const { socketConnected, socketDisconnected, socketEmitted } =
  socketActionCreators;

export default socketMiddleware();
