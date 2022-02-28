import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Board from "../../common/components/board/Board";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import Modal from "../../common/components/modal/Modal";
import Nav from "../../common/components/nav/Nav";
import { createGame } from "./gameSlice";

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

  useEffect(() => {
    dispatch(createGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGGButtonClick() {
    setShowModal(true);
  }

  function handleModalOkButtonClick() {
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
