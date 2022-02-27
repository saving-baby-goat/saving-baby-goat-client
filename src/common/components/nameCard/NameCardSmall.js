import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNameCardSmall = styled.div`
  width: 10rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b47535;
  border: 0.3rem solid black;
  border-radius: 4rem;

  .name-card {
    font-size: 1rem;
  }
`;

function NameCardSmall({ children, label }) {
  return (
    <StyledNameCardSmall>
      <div className="name-card">
        {label} {children}
      </div>
    </StyledNameCardSmall>
  );
}

NameCardSmall.propTypes = {
  children: PropTypes.string.isRequired,
  label: PropTypes.string,
};

NameCardSmall.defaultProps = {
  label: "",
};

export default NameCardSmall;
