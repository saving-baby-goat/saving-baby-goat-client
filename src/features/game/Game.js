import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Board from "../../common/components/board/Board";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import Modal from "../../common/components/modal/Modal";
import NameCardLarge from "../../common/components/nameCard/NameCardLarge";
import Nav from "../../common/components/nav/Nav";
import {
  socketDisconnected,
  socketEmitted,
} from "../../common/middlewares/socketMiddleware";
import { CURRNET_GAME_STATE_OPTIONS, LEVEL } from "../../common/util/constants";
import {
  changeCurrentGameState,
  createGame,
  onRollDice,
  setCustomNodeList,
  setShortestPath,
} from "./gameSlice";

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .GGButtonContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem 0;
  }

  .NameCardLargeContainer {
    display: flex;
    justify-content: center;
  }

  .buttonsContainer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }
`;

function Game() {
  const { level } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [hasCreateGame, setHasCreateGame] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [customMapStart, setCustomMapStart] = useState(false);

  const currentGameState = useSelector((state) => state.game.currentGameState);
  const mySocketId = useSelector((state) => state.game.mySocketId);
  const nodeList = useSelector((state) => state.game.nodeList);
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const isGameConnected = useSelector((state) => state.game.isGameConnected);
  const player1SocketId = useSelector((state) => state.game.player1SocketId);
  const player2SocketId = useSelector((state) => state.game.player2SocketId);
  const player1Nickname = useSelector((state) => state.game.player1Nickname);
  const player2Nickname = useSelector((state) => state.game.player2Nickname);
  const mineralNodeIdList = useSelector(
    (state) => state.game.mineralNodeIdList
  );

  useEffect(() => {
    if (isGameOver && mySocketId) {
      dispatch(setShortestPath(currentGameState));
    }
  }, [isGameOver]);

  useEffect(() => {
    if (
      level === LEVEL.CUSTOM_MAP &&
      player1SocketId === mySocketId &&
      !customMapStart
    ) {
      const customMapNodeList = location.state;
      dispatch(setCustomNodeList(customMapNodeList));
      setHasCreateGame(true);
      setCustomMapStart(true);
      return;
    }

    if (
      currentGameState === CURRNET_GAME_STATE_OPTIONS.START &&
      player1SocketId === mySocketId
    ) {
      dispatch(createGame(level));
      setHasCreateGame(true);
    }
  }, [currentGameState]);

  useEffect(() => {
    if (
      currentGameState === CURRNET_GAME_STATE_OPTIONS.START &&
      player1SocketId === mySocketId
    ) {
      const targetId = player2SocketId;
      dispatch(socketEmitted("sendNodeList", { nodeList, targetId }));
      dispatch(
        changeCurrentGameState(CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN)
      );
      dispatch(
        socketEmitted("sendMineralNodeIdList", {
          mineralNodeIdList,
          targetId,
        })
      );
    }
  }, [hasCreateGame]);

  function handleModalOkButtonClick() {
    dispatch(socketDisconnected());
    navigate(-1);
  }

  function handleModalCloseClick() {
    setShowModal(false);
  }

  function setContentAndShowModal(content) {
    setShowModal(true);
    setModalContent(content);
  }

  function handleAcceptCheatingButton() {
    dispatch(onRollDice(999));
    setShowModal(false);
  }

  function handleCheatingButton() {
    setContentAndShowModal(
      <>
        <div>?????????....</div>
        <div className="buttonsContainer">
          <ButtonSmall type="button" onClick={handleAcceptCheatingButton}>
            ??????
          </ButtonSmall>
          <ButtonSmall type="button" onClick={handleModalCloseClick}>
            ??????
          </ButtonSmall>
        </div>
      </>
    );
  }

  function handleGGButtonClick() {
    setContentAndShowModal(
      <>
        <div>????????? ??????????????????????</div>
        <div className="buttonsContainer">
          <ButtonSmall type="button" onClick={handleModalOkButtonClick}>
            ?????????
          </ButtonSmall>
          <ButtonSmall type="button" onClick={handleModalCloseClick}>
            ??????
          </ButtonSmall>
        </div>
      </>
    );
  }

  return (
    <StyledGame>
      <div className="NameCardLargeContainer">
        {isGameOver && (
          <NameCardLarge>
            {currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_WIN
              ? `${player1Nickname} WIN`
              : `${player2Nickname} WIN`}
          </NameCardLarge>
        )}
      </div>

      {!isGameConnected && (
        <Modal onModalCloseClick={handleModalOkButtonClick}>
          ???????????? ????????? ???????????????.
          <ButtonSmall type="button" onClick={handleModalOkButtonClick}>
            ?????????
          </ButtonSmall>
        </Modal>
      )}
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
      <Nav isGameOver={isGameOver} />
      <Board />
      <div className="GGButtonContainer">
        <ButtonFluid onClick={handleCheatingButton}>?????????</ButtonFluid>
        <ButtonFluid onClick={handleGGButtonClick}>?????????</ButtonFluid>
      </div>
    </StyledGame>
  );
}

export default Game;
