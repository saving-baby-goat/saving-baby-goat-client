import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT from "../../../assets/babyGoat.png";
import MINERAL from "../../../assets/mineral.png";
import { setNodeState } from "../../../features/game/gameSlice";
import { COLOR, DECIMAL } from "../../util/constants";
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
    type === "player1Path" || type === "player1Start"
      ? `
      background-color: ${COLOR.BLUE};`
      : `background-color: ${COLOR.BROWN};`};

  .image {
    max-width: 40px;
    max-height: 40px;
  }
`;

function Node({ nodeId }) {
  const dispatch = useDispatch();

  const currentMoveCount = useSelector((state) => state.game.moveCount);
  const nodeList = useSelector((state) => state.game.nodeList);
  const player1StartNodeId = useSelector(
    (state) => state.game.player1StartNodeId
  );

  const currentNode = nodeList.byId[nodeId];
  const currentState = currentNode.nodeState;

  function handleNodeClick() {
    const isStart = !player1StartNodeId;
    // const rowNumber = nodeId.split("-")[0];
    const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

    if (!currentMoveCount) {
      // 주사위 0일때
      return;
    }

    if (currentState === "player1Path") {
      // 이미 지나간 길일때
      return;
    }

    if (player1StartNodeId === "") {
      if (columnNumber !== 0) {
        // 처음 시작인데, 0번째 아닐때
        return;
      }
      if (columnNumber === 0) {
        // 처음 시작 + 0번째 일떼
        dispatch(setNodeState({ nodeId, nodeState: "player1Path", isStart }));
        return;
      }
    }

    if (hasNearPlayerPath(nodeList, nodeId)) {
      // 주변에 지나온 길이 있을 때
      dispatch(setNodeState({ nodeId, nodeState: "player1Path", isStart }));
    }
  }

  function renderImgByCurrentNodeState() {
    switch (currentState) {
      case "goat":
        return <img className="image" src={GOAT} alt="goat" />;
      case "mineral":
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
      type={currentState}
    >
      {renderImgByCurrentNodeState()}
    </StyledNode>
  );
}

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
};

export default Node;
