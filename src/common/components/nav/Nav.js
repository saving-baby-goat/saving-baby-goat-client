import React, { useEffect, useState } from "react";
import Dice from "react-dice-roll";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { changePlayerTurn, onRollDice } from "../../../features/game/gameSlice";
import { socketEmitted } from "../../middlewares/socketMiddleware";
import { CURRNET_GAME_STATE_OPTIONS } from "../../util/constants";
import ButtonFluid from "../buttons/ButtonFluid";
import NameCardDefault from "../nameCard/NameCardDefault";
import NameCardSmall from "../nameCard/NameCardSmall";

const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;

  .section-one {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .section-two {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .section-tree {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

function Nav() {
  const dispatch = useDispatch();
  const gameLevel = useSelector((state) => state.game.gameLevel);
  const currentMoveCount = useSelector((state) => state.game.moveCount);
  const isMyTurn = useSelector((state) => state.game.isMyTurn);
  const currentGameState = useSelector((state) => state.game.currentGameState);
  const player1SocketId = useSelector((state) => state.game.player1SocketId);
  const player2SocketId = useSelector((state) => state.game.player2SocketId);
  const mySocketId = useSelector((state) => state.game.mySocketId);
  const player1Nickname = useSelector((state) => state.game.player1Nickname);
  const player2Nickname = useSelector((state) => state.game.player2Nickname);
  const [displayName, setDisplayName] = useState("");
  const [isClickedDice, setIsClickedDice] = useState(false);

  useEffect(() => {
    switch (currentGameState) {
      case CURRNET_GAME_STATE_OPTIONS.WAITING:
        setDisplayName("상대방 기다리는중...");
        break;
      case CURRNET_GAME_STATE_OPTIONS.START:
        setDisplayName("게임이 시작되었습니다.");
        break;

      case CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN:
        setDisplayName(`${player1Nickname} TURN`);
        break;

      case CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN:
        setDisplayName(`${player2Nickname} TURN`);

        break;
      default:
        break;
    }
  }, [currentGameState]);

  useEffect(() => {
    if (isMyTurn) {
      setIsClickedDice(false);
    }
  }, [isMyTurn]);

  function handleEndOfTrurnClick() {
    if (!isMyTurn) {
      return;
    }
    const targetId =
      mySocketId === player1SocketId ? player2SocketId : player1SocketId;
    dispatch(changePlayerTurn(currentGameState));

    dispatch(socketEmitted("sendEndOfTurn", { currentGameState, targetId }));
  }

  function handleDiceClicked(value) {
    setIsClickedDice(true);
    dispatch(onRollDice(value));
  }

  return (
    <StyledNav>
      <div className="section-one">
        <NameCardDefault>{gameLevel}</NameCardDefault>
        <ButtonFluid onClick={handleEndOfTrurnClick}>턴 종 료</ButtonFluid>
      </div>
      <div className="section-two">
        <Dice
          size={75}
          onRoll={(value) => {
            handleDiceClicked(value);
          }}
          disabled={isClickedDice}
        />
        <NameCardSmall label="남은 걸음 수 : ">
          {currentMoveCount}
        </NameCardSmall>
      </div>
      <div className="section-tree">
        <NameCardDefault>{displayName}</NameCardDefault>
      </div>
    </StyledNav>
  );
}

export default Nav;
