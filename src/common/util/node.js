/* eslint-disable no-console */

import {
  setNodeState,
  updateMineralCount,
} from "../../features/game/gameSlice";
import { socketEmitted } from "../middlewares/socketMiddleware";
import { CURRNET_GAME_STATE_OPTIONS, DECIMAL, NODE_STATE } from "./constants";

export function clickedBombNode(
  dispatch,
  nodeList,
  nodeId,
  isStart,
  currentGameState
) {
  if (!hasNearPlayerPath(nodeList, nodeId, currentGameState) && !isStart) {
    return;
  }
  const option = NODE_STATE.BOMB;
  dispatch(setNodeState({ nodeId, isStart, currentGameState, option }));
}

export function clickedDefaultNode(
  dispatch,
  currentGameState,
  player1StartNodeId,
  player2StartNodeId,
  nodeList,
  nodeId
) {
  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
    const isStart = !player1StartNodeId;
    const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

    if (player1StartNodeId === "") {
      console.log("111");
      if (columnNumber !== 0) {
        console.log("1p// 처음 시작인데, 0번째 아닐때");
        // 처음 시작인데, 0번째 아닐때
        return;
      }
      if (columnNumber === 0) {
        console.log("1p// 처음 시작 + 0번째 일떼");
        // 처음 시작 + 0번째 일떼
        dispatch(
          setNodeState({
            nodeId,
            isStart,
            currentGameState,
          })
        );

        return;
      }
    }

    if (hasNearPlayerPath(nodeList, nodeId, currentGameState)) {
      console.log("1p// 주변에 지나온 길이 있을 때");

      // 주변에 지나온 길이 있을 때
      dispatch(
        setNodeState({
          nodeId,
          isStart,
          currentGameState,
        })
      );
      return;
    }

    if (nodeList.byId[nodeId].nodeState === NODE_STATE.EXPLODED_BOMB) {
      dispatch(
        setNodeState({
          nodeId,
          isStart,
          currentGameState,
        })
      );
      return;
    }
  }

  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
    const isStart = !player2StartNodeId;
    const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

    if (player2StartNodeId === "") {
      if (columnNumber !== 30) {
        console.log("2p// 처음 시작인데, 0번째 아닐때");
        // 처음 시작인데, 0번째 아닐때
        return;
      }
      if (columnNumber === 30) {
        console.log("2p// 처음 시작 + 0번째 일떼");
        // 처음 시작 + 0번째 일떼
        dispatch(
          setNodeState({
            nodeId,
            isStart,
            currentGameState,
          })
        );

        return;
      }
    }

    if (hasNearPlayerPath(nodeList, nodeId, currentGameState)) {
      console.log("2p// 주변에 지나온 길이 있을 때");
      // 주변에 지나온 길이 있을 때
      dispatch(
        setNodeState({
          nodeId,
          isStart,
          currentGameState,
        })
      );
      return;
    }

    if (nodeList.byId[nodeId].nodeState === NODE_STATE.EXPLODED_BOMB) {
      dispatch(
        setNodeState({
          nodeId,
          isStart,
          currentGameState,
        })
      );
    }
  }
}

export function clickedMineralNode(
  dispatch,
  nodeList,
  nodeId,
  isStart,
  currentGameState,
  targetId
) {
  console.log("isStart", isStart);

  if (!hasNearPlayerPath(nodeList, nodeId, currentGameState) && !isStart) {
    return;
  }

  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
    console.log("=====1P");
    dispatch(
      setNodeState({
        nodeId,
        isStart,
        currentGameState,
      })
    );
    dispatch(updateMineralCount(currentGameState));
    dispatch(socketEmitted("sendMineralCount", { currentGameState, targetId }));
  }

  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
    console.log("=====2P");
    dispatch(
      setNodeState({
        nodeId,
        isStart,
        currentGameState,
      })
    );
    dispatch(updateMineralCount(currentGameState));
    dispatch(socketEmitted("sendMineralCount", { currentGameState, targetId }));
  }
}

export function hasNearPlayerPath(nodeList, nodeId, currentGameState) {
  const rowNumber = parseInt(nodeId.split("-")[0], DECIMAL);
  const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

  const direction = {
    left: `${rowNumber}-${columnNumber - 1}`,
    right: `${rowNumber}-${columnNumber + 1}`,
    up: `${rowNumber + 1}-${columnNumber}`,
    down: `${rowNumber - 1}-${columnNumber}`,
  };

  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
    if (
      nodeList.byId[direction.left]?.nodeState === NODE_STATE.PLAYER_1_PATH ||
      nodeList.byId[direction.right]?.nodeState === NODE_STATE.PLAYER_1_PATH ||
      nodeList.byId[direction.up]?.nodeState === NODE_STATE.PLAYER_1_PATH ||
      nodeList.byId[direction.down]?.nodeState === NODE_STATE.PLAYER_1_PATH
    ) {
      return true;
    }
  }

  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
    if (
      nodeList.byId[direction.left]?.nodeState === NODE_STATE.PLAYER_2_PATH ||
      nodeList.byId[direction.right]?.nodeState === NODE_STATE.PLAYER_2_PATH ||
      nodeList.byId[direction.up]?.nodeState === NODE_STATE.PLAYER_2_PATH ||
      nodeList.byId[direction.down]?.nodeState === NODE_STATE.PLAYER_2_PATH
    ) {
      return true;
    }
  }

  return false;
}
