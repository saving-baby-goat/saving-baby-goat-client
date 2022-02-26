import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButtonDefault = styled.div`
  width: 20%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b47535;
  border: 0.3rem solid black;
  border-radius: 4rem;
  cursor: pointer;

  .button {
    font-size: 2rem;
  }
`;

function ButtonDefault({ onClick, contents }) {
  return (
    <StyledButtonDefault>
      <div
        className="button"
        role="button"
        tabIndex={0}
        onClick={() => {
          onClick();
        }}
        onKeyDown={() => {
          onClick();
        }}
      >
        {contents}
      </div>
    </StyledButtonDefault>
  );
}

ButtonDefault.propTypes = {
  contents: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonDefault;
