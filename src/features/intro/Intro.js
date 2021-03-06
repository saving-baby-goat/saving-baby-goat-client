import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import Input from "../../common/components/inputs/Input";
import Modal from "../../common/components/modal/Modal";
import NameCardDefault from "../../common/components/nameCard/NameCardDefault";
import Title from "../../common/components/title/Title";
import { socketConnected } from "../../common/middlewares/socketMiddleware";
import { LEVEL } from "../../common/util/constants";
import { setGameLevel } from "../game/gameSlice";
import { setNickname } from "./introSlice";

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
  }

  .contents-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 35rem;
  }

  .nickname-container {
    position: absolute;
    top: 80%;
    left: 75%;
    width: 100%;
  }
`;

function Intro() {
  const [startButtonClick, setStartButtonClick] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [usersInput, setUsersInput] = useState("");
  const [showStartButton, setStartButton] = useState(false);
  const [showLevelButton, setShowLevelButton] = useState(false);
  const [showNickname, setShowNickname] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const nickname = useSelector((state) => state.intro.nickname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (nickname) {
      setStartButton(true);
      setShowNickname(true);
      setStartButtonClick(true);
    }
  }, []);

  function handleIntroStartButtonClick() {
    setStartButtonClick(true);

    if (nickname) {
      setStartButton(true);
      setShowNickname(true);
      return;
    }

    setShowInput(true);
  }

  function handleOnChange(event) {
    setUsersInput(event.target.value);
  }

  function handleNicknameSubmit(event) {
    event.preventDefault();

    if (!usersInput || usersInput.length > 20) {
      setContentAndShowModal(
        <>
          <div>???????????? 1 ~ 20??? ?????????.</div>
          <ButtonSmall type="button" onClick={handleModalCloseClick}>
            ??????
          </ButtonSmall>
        </>
      );

      return;
    }

    dispatch(setNickname(usersInput));
    setNickname(usersInput);
    setUsersInput("");
    setShowInput(false);
    setStartButton(true);
    setShowNickname(true);
  }

  function handleGameStartButtonClick() {
    setStartButton(false);
    setShowLevelButton(true);
  }

  function handleCreateCustomMap() {
    navigate("/customMapCreate");
  }

  function handleModalCloseClick() {
    setShowModal(false);
  }

  function handleGameLevelClick(level) {
    if (level === LEVEL.CUSTOM_MAP) {
      navigate("/customMapList");
      return;
    }
    dispatch(setGameLevel(level));
    dispatch(socketConnected(level, nickname));
    navigate(`/game/${level}`);
  }

  function setContentAndShowModal(content) {
    setShowModal(true);
    setModalContent(content);
  }

  return (
    <StyledIntro>
      {showModal && (
        <Modal
          onModalCloseClick={() => {
            setModalContent("");
            setShowModal(false);
          }}
        >
          {modalContent}
        </Modal>
      )}
      <div className="title">
        <Title />
      </div>
      <div className="contents-container">
        {!startButtonClick && (
          <ButtonDefault onClick={handleIntroStartButtonClick}>
            ??? ??? !!
          </ButtonDefault>
        )}
        {showInput && (
          <Input
            inputTitle="???????????? ????????? ???????????? ????????? ?????????."
            label="?????????"
            onChange={handleOnChange}
            onClick={handleNicknameSubmit}
          />
        )}
        {showStartButton && (
          <div className="contents-container">
            <ButtonDefault onClick={handleGameStartButtonClick}>
              ?????? ??????
            </ButtonDefault>
            <ButtonDefault onClick={handleCreateCustomMap}>
              Custom Map ??????
            </ButtonDefault>
          </div>
        )}
        {showLevelButton && (
          <div className="contents-container">
            <ButtonDefault onClick={handleGameLevelClick}>
              {LEVEL.EASY}
            </ButtonDefault>
            <ButtonDefault onClick={handleGameLevelClick}>
              {LEVEL.NORMAL}
            </ButtonDefault>
            <ButtonDefault onClick={handleGameLevelClick}>
              {LEVEL.HARD}
            </ButtonDefault>
            <ButtonDefault onClick={handleGameLevelClick}>
              {LEVEL.CUSTOM_MAP}
            </ButtonDefault>
          </div>
        )}
      </div>
      {showNickname && (
        <div className="nickname-container">
          <NameCardDefault label="????????? : ">{nickname}</NameCardDefault>
        </div>
      )}
    </StyledIntro>
  );
}

export default Intro;
