import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledButtonFluid = styled.button`
  width: 15rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: 4rem;
  cursor: pointer;
`;

function ButtonFluid({ onClick, color, disabled, children }) {
  return (
    <StyledButtonFluid
      type="button"
      onClick={onClick}
      color={color}
      disabled={disabled}
    >
      {children}
    </StyledButtonFluid>
  );
}

ButtonFluid.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

ButtonFluid.defaultProps = {
  disabled: false,
  color: COLOR.RED,
};

export default ButtonFluid;
