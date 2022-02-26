import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledButtonSmall = styled.button`
  color: ${COLOR.BROWN};
  background-color: ${COLOR.BLACK};
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

function ButtonSmall({ onClick, disabled, children }) {
  return (
    <StyledButtonSmall onClick={onClick} disabled={disabled}>
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
