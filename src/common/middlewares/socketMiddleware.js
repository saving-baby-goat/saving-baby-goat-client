import { io } from "socket.io-client";

import {
  setGameInfo,
  setWaitingStatus,
  setCurrentPlayerSocketId,
  setMapEqual,
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
          storeAPI.dispatch(setGameInfo(gameRoomInfo));
        } else {
          storeAPI.dispatch(setWaitingStatus());
        }
        storeAPI.dispatch(setCurrentPlayerSocketId(currnetPlayerSocketId));
      });

      socket.on("sendMap", (NodeList) => {
        storeAPI.dispatch(setMapEqual(NodeList));
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
