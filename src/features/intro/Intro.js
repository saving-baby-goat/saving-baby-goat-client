import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import Input from "../../common/components/inputs/Input";
import Modal from "../../common/components/modal/Modal";
import NameCardDefault from "../../common/components/namsCard/NameCardDefault";
import Title from "../../common/components/title/Title";
import { LEVEL } from "../../common/util/constants";
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

  function handleIntroStartButtonClick() {
    setStartButtonClick(true);
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
          <ButtonDefault
            contents="드 가 자 ~"
            onClick={handleIntroStartButtonClick}
          />
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
            <ButtonDefault
              contents="게임 시작"
              onClick={handleGameStartButtonClick}
            />
            <ButtonDefault
              contents="Custom Map 제작"
              onClick={handleCreateCustomMap}
            />
          </div>
        )}
        {showLevelButton && (
          <div className="contents-container">
            <ButtonDefault contents={LEVEL.EASY} />
            <ButtonDefault contents={LEVEL.NORMAL} />
            <ButtonDefault contents={LEVEL.HARD} />
            <ButtonDefault contents={LEVEL.CUSTOM_MAP} />
          </div>
        )}
      </div>
      {showNickname && (
        <div className="nickname-container">
          <NameCardDefault contents={nickname} />
        </div>
      )}
    </StyledIntro>
  );
}

export default Intro;
