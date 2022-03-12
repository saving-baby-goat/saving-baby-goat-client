import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT_ASSET from "../../../assets/babyGoat.svg";
import MINERAL_ASSET from "../../../assets/mineral.svg";
import ROCK_ASSET from "../../../assets/rocks.svg";
import { setCurrnetSelectorState } from "../../../features/customMap/customMapSlice";
import { COLOR, NODE_STATE } from "../../util/constants";

const StyledSelector = styled.div`
  width: 40rem;
  height: 7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #b47535;
  border: 0.3rem solid black;
  border-radius: 4rem;

  .option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    &:hover {
      border-radius: 5px;
      background-color: ${COLOR.DARK_BROWN};
      opacity: 0.8;
    }

    &:active {
      border-radius: 5px;
      background-color: ${COLOR.HEAVY_GREY};
    }
  }

  .img {
    width: 50px;
    height: 50px;
  }

  .bomb {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: ${COLOR.RED};
  }

  .clicked {
    border-radius: 5px;
    background-color: ${COLOR.HEAVY_GREY};
  }
`;

function Selector() {
  const dispatch = useDispatch();

  const currentSelectorState = useSelector(
    (state) => state.customMap.currentSelectorState
  );

  function handleNodeClick(e) {
    dispatch(setCurrnetSelectorState(e.target.id));
  }

  return (
    <StyledSelector>
      <div
        className={`option ${
          currentSelectorState === NODE_STATE.GOAT ? `clicked` : null
        }`}
        onClick={(e) => {
          handleNodeClick(e);
        }}
        onKeyDown={(e) => {
          handleNodeClick(e);
        }}
        role="button"
        tabIndex={0}
      >
        <img id={NODE_STATE.GOAT} className="img" src={GOAT_ASSET} alt="goat" />
      </div>
      <div
        className={`option ${
          currentSelectorState === NODE_STATE.MINERAL ? `clicked` : null
        }`}
        onClick={(e) => {
          handleNodeClick(e);
        }}
        onKeyDown={(e) => {
          handleNodeClick(e);
        }}
        role="button"
        tabIndex={0}
      >
        <img
          id={NODE_STATE.MINERAL}
          className="img"
          src={MINERAL_ASSET}
          alt="mineral"
        />
      </div>
      <div
        className={`option ${
          currentSelectorState === NODE_STATE.ROCK ? `clicked` : null
        }`}
        onClick={(e) => {
          handleNodeClick(e);
        }}
        onKeyDown={(e) => {
          handleNodeClick(e);
        }}
        role="button"
        tabIndex={0}
      >
        <img
          id={NODE_STATE.ROCK}
          className="img"
          src={ROCK_ASSET}
          alt="mineral"
        />
      </div>
      <div
        className={`option ${
          currentSelectorState === NODE_STATE.BOMB ? `clicked` : null
        }`}
        onClick={(e) => {
          handleNodeClick(e);
        }}
        onKeyDown={(e) => {
          handleNodeClick(e);
        }}
        role="button"
        tabIndex={0}
      >
        <div id={NODE_STATE.BOMB} className="bomb" />
      </div>
    </StyledSelector>
  );
}

export default Selector;
