/* eslint-disable no-console */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT from "../../../assets/babyGoat.png";
import MINERAL from "../../../assets/mineral.png";
import {
  currentGameStateOpstion,
  setNodeState,
} from "../../../features/game/gameSlice";
import { socketEmitted } from "../../middlewares/socketMiddleware";
import { COLOR, DECIMAL, NODE_STATE } from "../../util/constants";
import { hasNearPlayerPath } from "../../util/node";

const StyledNode = styled.div`
  min-width: 40px;
  min-height: 40px;
  border-radius: 3px;
  border: 1px solid ${COLOR.BLACK};
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ type }) =>
    // eslint-disable-next-line no-nested-ternary
    type === "player1Path" || type === "player1Start"
      ? `background-color: ${COLOR.BLUE};`
      : type === "player2Path" || type === "player2Start"
      ? ` background-color: ${COLOR.GREEN};`
      : `background-color: ${COLOR.BROWN};`};

  .image {
    max-width: 40px;
    max-height: 40px;
  }
`;

function Node({ nodeId }) {
  const dispatch = useDispatch();

  const nodeList = useSelector((state) => state.game.nodeList);
  const currentMoveCount = useSelector((state) => state.game.moveCount);
  const player1StartNodeId = useSelector(
    (state) => state.game.player1StartNodeId
  );
  const player2StartNodeId = useSelector(
    (state) => state.game.player2StartNodeId
  );
  const player1SocketId = useSelector((state) => state.game.player1SocketId);
  const player2SocketId = useSelector((state) => state.game.player2SocketId);
  const mySocketId = useSelector((state) => state.game.mySocketId);
  const currentGameState = useSelector((state) => state.game.currentGameState);
  const isMyTurn = useSelector((state) => state.game.isMyTurn);

  const [isCurrnetNodeChange, setIsCurrnetNodeChange] = useState(false);

  const currentNode = nodeList.byId[nodeId];
  const currentNodeState = currentNode.nodeState;

  useEffect(() => {
    if (isCurrnetNodeChange) {
      const targetId =
        mySocketId === player1SocketId ? player2SocketId : player1SocketId;
      dispatch(socketEmitted("sendNodeList", { nodeList, targetId }));
      setIsCurrnetNodeChange(false);
    }
  }, [currentMoveCount]);

  function handleNodeClick() {
    if (!isMyTurn) {
      console.log("니차례 아니다");
      return;
    }

    if (!currentMoveCount) {
      console.log("주사위 0 이다!!");
      // 주사위 0일때
      return;
    }

    if (
      currentNodeState === NODE_STATE.PLAYER_1_PATH ||
      currentNodeState === NODE_STATE.PLAYER_2_PATH
    ) {
      // 이미 지나간 길일때
      return;
    }

    if (currentGameState === currentGameStateOpstion.PLAYER_1_TURN) {
      console.log("1P 시작");
      const isStart = !player1StartNodeId;
      const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

      if (player1StartNodeId === "") {
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
              nodeState: NODE_STATE.PLAYER_1_PATH,
              isStart,
              currentGameState,
            })
          );
          setIsCurrnetNodeChange(true);
          return;
        }
      }

      if (hasNearPlayerPath(nodeList, nodeId)) {
        console.log("1p// 주변에 지나온 길이 있을 때");

        // 주변에 지나온 길이 있을 때
        dispatch(
          setNodeState({
            nodeId,
            nodeState: NODE_STATE.PLAYER_1_PATH,
            isStart,
            currentGameState,
          })
        );
        setIsCurrnetNodeChange(true);
        return;
      }
    }

    if (currentGameState === currentGameStateOpstion.PLAYER_2_TURN) {
      console.log("2P 시작");
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
              nodeState: NODE_STATE.PLAYER_2_PATH,
              isStart,
              currentGameState,
            })
          );
          setIsCurrnetNodeChange(true);
          return;
        }
      }

      if (hasNearPlayerPath(nodeList, nodeId)) {
        console.log("2p// 주변에 지나온 길이 있을 때");
        // 주변에 지나온 길이 있을 때
        dispatch(
          setNodeState({
            nodeId,
            nodeState: NODE_STATE.PLAYER_2_PATH,
            isStart,
            currentGameState,
          })
        );
        setIsCurrnetNodeChange(true);
        return;
      }
    }
    console.log("꽝!!!");
  }

  function renderImgByCurrentNodeState() {
    switch (currentNodeState) {
      case NODE_STATE.GOAT:
        return <img className="image" src={GOAT} alt="goat" />;
      case NODE_STATE.MINERAL:
        return <img className="image" src={MINERAL} alt="mineral" />;
      default:
        return null;
    }
  }

  return (
    <StyledNode
      role="button"
      onClick={handleNodeClick}
      onKeyPress={handleNodeClick}
      tabIndex={nodeId}
      type={currentNodeState}
    >
      {renderImgByCurrentNodeState()}
    </StyledNode>
  );
}

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
};

export default Node;
