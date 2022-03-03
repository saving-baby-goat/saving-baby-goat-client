/* eslint-disable no-console */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT from "../../../assets/babyGoat.png";
import MINERAL from "../../../assets/mineral.png";
import { socketEmitted } from "../../middlewares/socketMiddleware";
import { COLOR, NODE_STATE } from "../../util/constants";
import { clickedDefaultNode, clickedMineralNode } from "../../util/node";

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
  // const player1MineralCount = useSelector(
  //   (state) => state.game.player1MineralCount
  // );
  // const player2MineralCount = useSelector(
  //   (state) => state.game.player2MineralCount
  // );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (currentNodeState === NODE_STATE.MINERAL) {
      // 미네랄 밟았을때
      const isStart = !player1StartNodeId;
      const targetId =
        mySocketId === player1SocketId ? player2SocketId : player1SocketId;
      clickedMineralNode(
        dispatch,
        nodeList,
        nodeId,
        isStart,
        currentGameState,
        targetId
      );
      setIsCurrnetNodeChange(true);
    }

    setIsCurrnetNodeChange(
      clickedDefaultNode(
        dispatch,
        currentGameState,
        player1StartNodeId,
        player2StartNodeId,
        nodeList,
        nodeId
      )
    );
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
