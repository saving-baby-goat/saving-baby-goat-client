import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import icon from "../../../assets/icon-close.svg";
import { COLOR } from "../../util/constants";

const ModalWrapper = styled.div`
  z-index: 5;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 50rem;
  height: fit-content;
  border: 0.5rem solid ${COLOR.BLACK};
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: ${COLOR.BROWN};
  transform: translate(-50%, -50%);

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: ${COLOR.BROWN};

    .close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      margin-right: 0.5rem;
      color: black;
      font-size: 1.2rem;

      cursor: pointer;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 4rem;
    gap: 1.5rem;
    padding: 2rem 1rem 3rem 1rem;
    font-size: 2.5rem;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(72, 72, 72, 0.95);
  z-index: 2;

  cursor: default;
`;

function Modal({ children, onModalCloseClick }) {
  const $rootElement = document.querySelector("#root");

  function handleCloseClick() {
    onModalCloseClick();
  }

  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={handleCloseClick} />
      <ModalWrapper>
        <div className="header">
          <div
            className="close-button"
            onClick={handleCloseClick}
            onKeyDown={handleCloseClick}
            role="button"
            tabIndex={0}
          >
            <img src={icon} alt="닫기" />
          </div>
        </div>
        <div className="body">{children}</div>
      </ModalWrapper>
    </>,
    $rootElement
  );
}

Modal.propTypes = {
  onModalCloseClick: PropTypes.func,
  onModalOkButtonClick: PropTypes.func,
  onModalCancelButtonClick: PropTypes.func,
};

Modal.defaultProps = {
  onModalOkButtonClick: null,
  onModalCancelButtonClick: null,
};

export default Modal;
