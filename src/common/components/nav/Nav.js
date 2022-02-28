import React from "react";
import Dice from "react-dice-roll";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { onRollDice } from "../../../features/game/gameSlice";
import ButtonFluid from "../buttons/ButtonFluid";
import NameCardDefault from "../nameCard/NameCardDefault";
import NameCardSmall from "../nameCard/NameCardSmall";

const StyledNav = styled.div`
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .section-one {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .section-two {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .section-tree {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Nav() {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.intro.nickname);
  const gameLevel = useSelector((state) => state.game.gameLevel);
  const currentMoveCount = useSelector((state) => state.game.moveCount);

  return (
    <StyledNav>
      <div className="section-one">
        <NameCardDefault>{gameLevel}</NameCardDefault>
        <ButtonFluid onClick={() => {}}>턴 종 료</ButtonFluid>
      </div>
      <div className="section-two">
        <Dice size={75} onRoll={(value) => dispatch(onRollDice(value))} />
        <NameCardSmall label="남은 걸음 수 : ">
          {currentMoveCount}
        </NameCardSmall>
      </div>
      <div className="section-tree">
        <NameCardDefault>{nickname}</NameCardDefault>
        {/* 이부분 현재 게임 유저로 변경해야함. */}
      </div>
    </StyledNav>
  );
}

export default Nav;
