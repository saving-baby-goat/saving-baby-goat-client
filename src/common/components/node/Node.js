/* eslint-disable no-console */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT from "../../../assets/babyGoat.png";
import MINERAL from "../../../assets/mineral.png";
import ROCK from "../../../assets/rocks.svg";
import { updateCurrnetGameOver } from "../../../features/game/gameSlice";
import { socketEmitted } from "../../middlewares/socketMiddleware";
import {
  COLOR,
  CURRNET_GAME_STATE_OPTIONS,
  NODE_STATE,
  VICTORY_MINERAL_COUNT,
} from "../../util/constants";
import {
  clickedBombNode,
  clickedDefaultNode,
  clickedMineralNode,
  hasNearPlayerPath,
} from "../../util/node";

const StyledNode = styled.div`
  min-width: 40px;
  min-height: 40px;
  border-radius: 3px;
  border: 1px solid ${COLOR.BLACK};
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${COLOR.LIGHT_GREY};
  }

  &:active {
    background-color: ${COLOR.HEAVY_GREY};
  }

  ${({ type }) => {
    switch (type) {
      case NODE_STATE.PLAYER_1_PATH:
      case NODE_STATE.PLAYER_1_START_PATH:
        return `background-color: ${COLOR.BLUE};`;
      case NODE_STATE.PLAYER_2_PATH:
      case NODE_STATE.PLAYER_2_START_PATH:
        return `background-color: ${COLOR.GREEN};`;
      case NODE_STATE.SHORTEST_PATH:
        return `background-color: ${COLOR.YELLOW};`;
      case NODE_STATE.EXPLODED_BOMB:
        return `background-color: ${COLOR.RED};`;
      case NODE_STATE.BOMB:
        return `background-color: ${COLOR.BROWN};`;
      default:
        return `background-color: ${COLOR.BROWN};`;
    }
  }}

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
  const player1MineralCount = useSelector(
    (state) => state.game.player1MineralCount
  );
  const player2MineralCount = useSelector(
    (state) => state.game.player2MineralCount
  );

  const [isCurrnetNodeChange, setIsCurrnetNodeChange] = useState(false);

  const currentNode = nodeList.byId[nodeId];
  const currentNodeState = currentNode.nodeState;

  const targetId =
    mySocketId === player1SocketId ? player2SocketId : player1SocketId;

  useEffect(() => {
    if (isCurrnetNodeChange) {
      dispatch(socketEmitted("sendNodeList", { nodeList, targetId }));
      setIsCurrnetNodeChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoveCount]);

  function handleNodeClick() {
    if (!isMyTurn) {
      console.log("Not my turn");
      return;
    }

    if (!currentMoveCount) {
      console.log("주사위 0");
      // 주사위 0일때
      return;
    }

    if (currentNodeState === NODE_STATE.PLAYER_1_PATH) {
      // 이미 지나간 길일때
      return;
    }

    if (currentNodeState === NODE_STATE.PLAYER_2_PATH) {
      // 이미 지나간 길일때
      return;
    }

    let isStart = false;

    if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
      if (!player1StartNodeId) {
        isStart = true;
      }
    }

    if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
      if (!player2StartNodeId) {
        isStart = true;
      }
    }
    console.log("popopopoppo", isStart);
    if (currentNodeState === NODE_STATE.MINERAL) {
      console.log("미네랄!");

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

    if (currentNodeState === NODE_STATE.BOMB) {
      console.log("폭탄!!!");

      clickedBombNode(
        dispatch,
        nodeList,
        nodeId,
        isStart,
        currentGameState,
        targetId
      );

      setIsCurrnetNodeChange(true);
    }

    if (
      currentNodeState === NODE_STATE.DEFAULT ||
      currentNodeState === NODE_STATE.EXPLODED_BOMB
    ) {
      console.log("기본노드");

      clickedDefaultNode(
        dispatch,
        nodeList,
        nodeId,
        isStart,
        currentGameState,
        player1StartNodeId,
        player2StartNodeId
      );
      setIsCurrnetNodeChange(true);
    }

    if (isStart) {
      console.log("currentGameState", currentGameState);
      dispatch(socketEmitted("sendStartNodeId", { nodeId, targetId }));
    }

    if (currentNodeState === NODE_STATE.GOAT) {
      if (!hasNearPlayerPath(nodeList, nodeId, currentGameState)) {
        return;
      }

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN) {
        if (player1MineralCount < VICTORY_MINERAL_COUNT) {
          return;
        }
      }

      if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN) {
        if (player2MineralCount < VICTORY_MINERAL_COUNT) {
          return;
        }
      }

      dispatch(updateCurrnetGameOver(currentGameState));

      dispatch(socketEmitted("sendGameOver", { currentGameState, targetId }));
    }
  }

  function renderImgByCurrentNodeState() {
    switch (currentNodeState) {
      case NODE_STATE.GOAT:
        return <img className="image" src={GOAT} alt="goat" />;
      case NODE_STATE.MINERAL:
        return <img className="image" src={MINERAL} alt="mineral" />;
      case NODE_STATE.ROCK:
        return <img className="image" src={ROCK} alt="rock" />;
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
