import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledButtonDefault = styled.button`
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: ${COLOR.BROWN};
  border: 0.3rem solid black;
  border-radius: 4rem;
  cursor: pointer;
`;

function ButtonDefault({ onClick, disabled, children }) {
  return (
    <StyledButtonDefault
      type="button"
      disabled={disabled}
      onClick={() => {
        onClick(children);
      }}
      onKeyDown={() => {
        onClick(children);
      }}
    >
      {children}
    </StyledButtonDefault>
  );
}

ButtonDefault.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
ButtonDefault.defaultProps = {
  disabled: false,
};

export default ButtonDefault;
