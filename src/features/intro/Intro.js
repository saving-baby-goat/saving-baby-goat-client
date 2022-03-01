import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import Input from "../../common/components/inputs/Input";
import Modal from "../../common/components/modal/Modal";
import NameCardDefault from "../../common/components/nameCard/NameCardDefault";
import Title from "../../common/components/title/Title";
import { socketConnected } from "../../common/middlewares/socketMiddleware";
import { LEVEL } from "../../common/util/constants";
import { setGameLevel } from "../game/gameSlice";
import { setNickname } from "./introSlice";

const StyledIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .contents-container {
    width: 100%;
    height: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .nickname-container {
    width: 100%;
    position: absolute;
    top: 80%;
    left: 75%;
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

  const nickname = useSelector((state) => state.intro.nickname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (!usersInput || usersInput.length > 8) {
      setShowModal(true);
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
    // 커스텀맵 이동 추가
  }

  function handleModalCloseClick() {
    setShowModal(false);
  }

  function handleGameLevelClick(level) {
    dispatch(setGameLevel(level));
    dispatch(socketConnected(level, nickname));
    navigate("/game");
  }

  return (
    <StyledIntro>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>
          닉네임은 1 ~ 8자 입니다.
        </Modal>
      )}
      <div className="title">
        <Title />
      </div>
      <div className="contents-container">
        {!startButtonClick && (
          <ButtonDefault onClick={handleIntroStartButtonClick}>
            드 가 자 ~
          </ButtonDefault>
        )}
        {showInput && (
          <Input
            inputTitle="게임에서 사용할 닉네임을 입력해 주세요."
            label="닉네임"
            onChange={handleOnChange}
            onClick={handleNicknameSubmit}
          />
        )}
        {showStartButton && (
          <div className="contents-container">
            <ButtonDefault onClick={handleGameStartButtonClick}>
              게임 시작
            </ButtonDefault>
            <ButtonDefault onClick={handleCreateCustomMap}>
              Custom Map 제작
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
          <NameCardDefault label="닉네임 : ">{nickname}</NameCardDefault>
        </div>
      )}
    </StyledIntro>
  );
}

export default Intro;
