import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";
import ButtonSmall from "../buttons/ButtonSmall";

const StyledInputDefault = styled.form`
  width: 40%;
  height: 20rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: #b47535;
  color: ${COLOR.BLACK};
  margin: 1rem;
  border: 0.3rem solid ${COLOR.BLACK};
  border-radius: 4rem;

  .input-title {
    font-size: 1.5rem;
  }

  .inputContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;

    input {
      margin-left: 1rem;
      margin-right: 1rem;
      font-size: 1.5rem;
    }
  }
`;

function Input({
  label,
  inputTitle,
  placeholder,
  onChange,
  onClick,
  disabled,
}) {
  function handleOnChange(event) {
    onChange(event);
  }

  return (
    <StyledInputDefault>
      <div className="input-title">{inputTitle}</div>
      <div className="inputContainer">
        <label htmlFor="input">{label} : </label>
        <input
          type="text"
          id="input"
          placeholder={placeholder}
          onChange={handleOnChange}
        />
        <ButtonSmall onClick={onClick} disabled={disabled}>
          입력하기
        </ButtonSmall>
      </div>
    </StyledInputDefault>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "입력하세요...",
  disabled: false,
  onClick: () => {},
};

export default Input;
