import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNameCardTiny = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border: 0.2rem solid black;
  border-radius: 2rem;

  .name-card {
    font-size: 0.8rem;
  }
`;

function NameCardTiny({ children, label, color }) {
  return (
    <StyledNameCardTiny color={color}>
      <div className="name-card">
        {label} {children}
      </div>
    </StyledNameCardTiny>
  );
}

NameCardTiny.propTypes = {
  children: PropTypes.string.isRequired,
  label: PropTypes.string,
  color: PropTypes.string.isRequired,
};

NameCardTiny.defaultProps = {
  label: "",
};

export default NameCardTiny;
