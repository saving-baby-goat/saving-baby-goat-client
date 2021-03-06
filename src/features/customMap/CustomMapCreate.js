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
import {
  COLOR,
  MAXIMUM_MAP_NAME_LENGTH,
  MAXIMUM_MINERAL_COUNT,
  MINIMUM_MINERAL_COUNT,
} from "../../common/util/constants";
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
    if (!mapName || mapName.length > MAXIMUM_MAP_NAME_LENGTH) {
      setContentAndShowModal(
        <>
          <div>??? ????????? 1 ~ 20??? ?????????.</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            ??????
          </ButtonSmall>
        </>
      );
      return;
    }

    if (!isGoatOnBoard) {
      setContentAndShowModal(
        <>
          <div>??????????????? ???????????????!</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            ??????
          </ButtonSmall>
        </>
      );
      return;
    }
    if (
      findMineralNodeIdList(nodeList).length < MINIMUM_MINERAL_COUNT ||
      findMineralNodeIdList(nodeList).length > MAXIMUM_MINERAL_COUNT
    ) {
      setContentAndShowModal(
        <>
          <div>????????? ????????? ?????? 2??? ??????</div>
          <div>?????? 10??? ?????? ?????????.</div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            ??????
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
          <div>Custom Map ?????? ??????!</div>
          <ButtonSmall type="button" onClick={() => navigate(-1)}>
            ????????????
          </ButtonSmall>
        </>
      );
    } catch (error) {
      setContentAndShowModal(
        "Custom Map ?????? ??????... ????????? ?????? ????????? ?????????"
      );
    }
  }

  function handleEndButtonClick() {
    setContentAndShowModal(
      <>
        <div>????????? ??????????????????????</div>
        <div>?????? ????????? ???????????? ????????????.</div>
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
            ?????????
          </ButtonSmall>
          <ButtonSmall
            type="button"
            onClick={() => {
              setModalContent("");
              setShowModal(false);
            }}
          >
            ??????
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
          <label htmlFor="input">??? ?????? : </label>
          <input
            type="text"
            id="input"
            placeholder="20??? ????????? ????????? ?????????"
            onChange={handleOnChange}
          />
        </div>
        <div className="buttonContainer">
          <ButtonFluid onClick={handleSaveButtonClick}>SAVE</ButtonFluid>
          <ButtonFluid onClick={handleEndButtonClick}>????????????</ButtonFluid>
        </div>
      </InputAndButtonContainer>
    </StyledCustomMapCreate>
  );
}

export default CustomMapCreate;
