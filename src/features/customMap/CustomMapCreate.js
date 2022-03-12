import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import saveCustomMap from "../../common/api/saveCustomMap";
import BoardCustom from "../../common/components/board/BoardCustomMap";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import Modal from "../../common/components/modal/Modal";
import NavCustomMap from "../../common/components/nav/NavCustomMap";
import { COLOR } from "../../common/util/constants";
import { findMineralNodeIdList } from "../../common/util/game";
import { setStateInitialization } from "./customMapSlice";

const StyledCustomMapCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .buttonContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
  }
`;

const InputAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 70%;
  height: 4rem;
  border: 0.15rem solid black;
  border-radius: 4rem;
  background-color: ${COLOR.BROWN};
  font-size: 20px;

  .inputContainer {
    display: flex;
    align-items: center;

    input {
      width: 300px;
      height: 30px;
      margin-left: 1rem;
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

function CustomMapCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodeList = useSelector((state) => state.customMap.nodeList);
  const nickname = useSelector((state) => state.intro.nickname);
  const isGoatOnBoard = useSelector((state) => state.customMap.isGoatOnBoard);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [mapName, setMapName] = useState("");

  function setContentAndShowModal(content) {
    setShowModal(true);
    setModalContent(content);
  }

  function handleOnChange(event) {
    setMapName(event.target.value);
  }

  async function handleSaveButtonClick() {
    if (!mapName || mapName.length > 20) {
      setContentAndShowModal(
        <>
          <div>맵 이름은 1 ~ 20자 입니다.</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            확인
          </ButtonSmall>
        </>
      );
      return;
    }

    if (!isGoatOnBoard) {
      setContentAndShowModal(
        <>
          <div>염소위치를 정해주세요!</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            확인
          </ButtonSmall>
        </>
      );
      return;
    }
    if (
      findMineralNodeIdList(nodeList).length < 2 ||
      findMineralNodeIdList(nodeList).length > 6
    ) {
      setContentAndShowModal(
        <>
          <div>미네랄 갯수는 최소 2개 이상</div>
          <div>최대 6개 이하 입니다.</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            확인
          </ButtonSmall>
        </>
      );
      return;
    }

    try {
      await saveCustomMap({ nodeList, mapName, nickname });
      dispatch(setStateInitialization());
      setContentAndShowModal(
        <>
          <div>Custom Map 저장 완료!</div>
          <ButtonSmall type="button" onClick={() => navigate(-1)}>
            돌아가기
          </ButtonSmall>
        </>
      );
    } catch (error) {
      setContentAndShowModal(
        "Custom Map 저장 실패... 나중에 다시 시도해 보세요"
      );
    }
  }

  function handleEndButtonClick() {
    setContentAndShowModal(
      <>
        <div>정말로 나가시겠습니까?</div>
        <div>작업 내용은 저장되지 않습니다.</div>
        <div className="buttonsContainer">
          <ButtonSmall
            type="button"
            onClick={() => {
              dispatch(setStateInitialization());
              setModalContent("");
              navigate(-1);
              setShowModal(false);
            }}
          >
            나가기
          </ButtonSmall>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            취소
          </ButtonSmall>
        </div>
      </>
    );
  }

  return (
    <StyledCustomMapCreate>
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
      <NavCustomMap />
      <BoardCustom />
      <InputAndButtonContainer>
        <div className="inputContainer">
          <label htmlFor="input">맵 이름 : </label>
          <input
            type="text"
            id="input"
            placeholder="20자 이내로 입력해 주세요"
            onChange={handleOnChange}
          />
        </div>
        <div className="buttonContainer">
          <ButtonFluid onClick={handleSaveButtonClick}>SAVE</ButtonFluid>
          <ButtonFluid onClick={handleEndButtonClick}>종료하기</ButtonFluid>
        </div>
      </InputAndButtonContainer>
    </StyledCustomMapCreate>
  );
}

export default CustomMapCreate;
