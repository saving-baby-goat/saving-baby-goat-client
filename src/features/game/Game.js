import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Board from "../../common/components/board/Board";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import Modal from "../../common/components/modal/Modal";
import Nav from "../../common/components/nav/Nav";
import {
  socketDisconnected,
  socketEmitted,
} from "../../common/middlewares/socketMiddleware";
import {
  changeCurrentGameState,
  createGame,
  currentGameStateOpstion,
} from "./gameSlice";

const StyledGame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .GGButtonContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
`;

function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [hasCreateGame, setHasCreateGame] = useState(false);
  // const player1Nickname = useSelector((state) => state.game.player1Nickname);
  // const player2Nickname = useSelector((state) => state.game.player2Nickname);
  const currentGameRoomId = useSelector(
    (state) => state.game.currentGameRoomId
  );
  const currentGameState = useSelector((state) => state.game.currentGameState);
  const currentPlayerSocketId = useSelector(
    (state) => state.game.currentPlayerSocketId
  );
  const nodeList = useSelector((state) => state.game.nodeList);

  useEffect(() => {
    if (
      currentGameState === "start" &&
      currentGameRoomId === currentPlayerSocketId
    ) {
      dispatch(createGame());
      setHasCreateGame(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGameState]);

  useEffect(() => {
    if (
      currentGameState === "start" &&
      currentGameRoomId === currentPlayerSocketId
    ) {
      dispatch(socketEmitted("sendMap", nodeList));
      dispatch(changeCurrentGameState(currentGameStateOpstion.PLAYER_1_TURN));
    }
  }, [hasCreateGame]);

  function handleGGButtonClick() {
    setShowModal(true);
  }

  function handleModalOkButtonClick() {
    dispatch(socketDisconnected());
    navigate(-1);
  }

  function handleModalCloseClick() {
    setShowModal(false);
  }
  return (
    <StyledGame>
      {showModal && (
        <Modal
          onModalCloseClick={handleModalCloseClick}
          onModalOkButtonClick={handleModalOkButtonClick}
          onModalCancelButtonClick={handleModalCloseClick}
        >
          정말로 나가시겠습니까?
        </Modal>
      )}
      <Nav />
      <Board />
      <div className="GGButtonContainer">
        <ButtonFluid onClick={handleGGButtonClick}>G G</ButtonFluid>
      </div>
    </StyledGame>
  );
}

export default Game;
