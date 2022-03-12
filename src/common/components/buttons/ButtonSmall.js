import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledButtonSmall = styled.button`
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 1rem;
  color: ${COLOR.BROWN};
  background-color: ${COLOR.BLACK};
  font-size: 2rem;

  cursor: pointer;
`;

function ButtonSmall({ onClick, disabled, children }) {
  return (
    <StyledButtonSmall type="submit" onClick={onClick} disabled={disabled}>
      {children}
    </StyledButtonSmall>
  );
}

ButtonSmall.defaultProps = {
  disabled: false,
  onClick: () => {},
};

ButtonSmall.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default ButtonSmall;
