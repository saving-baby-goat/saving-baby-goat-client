import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GOAT from "../../../assets/babyGoat.png";
import MINERAL from "../../../assets/mineral.png";
import ROCK from "../../../assets/rocks.svg";
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
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

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
    background-color: ${COLOR.RED};
    border-radius: 5px;
    border: 1px solid black;
  }

  .clicked {
    background-color: ${COLOR.HEAVY_GREY};
    border-radius: 5px;
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
        <img id={NODE_STATE.GOAT} className="img" src={GOAT} alt="goat" />
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
          src={MINERAL}
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
        <img id={NODE_STATE.ROCK} className="img" src={ROCK} alt="mineral" />
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
