import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT_ASSET from "../../../assets/babyGoat.svg";
import MINERAL_ASSET from "../../../assets/mineral.svg";
import ROCK_ASSET from "../../../assets/rocks.svg";
import { setCurrnetNodeState } from "../../../features/customMap/customMapSlice";
import { COLOR, NODE_STATE } from "../../util/constants";

const StyledNodeCustom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 40px;
  margin: 1px;
  border-radius: 3px;
  border: 1px solid ${COLOR.BLACK};

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
      case NODE_STATE.BOMB:
        return `background-color: ${COLOR.RED};`;
      default:
        return `background-color: ${COLOR.BROWN};`;
    }
  }}

  .image {
    max-width: 40px;
    max-height: 40px;
  }
`;

function NodeCostom({ nodeId }) {
  const dispatch = useDispatch();
  const nodeList = useSelector((state) => state.customMap.nodeList);
  const currentSelectorState = useSelector(
    (state) => state.customMap.currentSelectorState
  );

  const currentNodeState = nodeList.byId[nodeId].nodeState;

  function handleNodeClick() {
    dispatch(setCurrnetNodeState({ nodeId, currentSelectorState }));
  }

  function renderImgByCurrentNodeState() {
    switch (currentNodeState) {
      case NODE_STATE.GOAT:
        return <img className="image" src={GOAT_ASSET} alt="goat" />;
      case NODE_STATE.MINERAL:
        return <img className="image" src={MINERAL_ASSET} alt="mineral" />;
      case NODE_STATE.ROCK:
        return <img className="image" src={ROCK_ASSET} alt="rock" />;
      default:
        return null;
    }
  }

  return (
    <StyledNodeCustom
      role="button"
      onClick={handleNodeClick}
      onKeyPress={handleNodeClick}
      tabIndex={nodeId}
      type={currentNodeState}
    >
      {renderImgByCurrentNodeState()}
    </StyledNodeCustom>
  );
}

NodeCostom.propTypes = {
  nodeId: PropTypes.string.isRequired,
};

export default NodeCostom;
