import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNameCardDefault = styled.div`
  z-index: 3;
  position: absolute;
  width: 80rem;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b47535;
  border: 0.3rem solid black;
  border-radius: 4rem;
  margin-top: 1rem;

  .name-card {
    font-size: 2rem;
  }
`;

function NameCardLarge({ children, label }) {
  return (
    <StyledNameCardDefault>
      <div className="name-card">
        {label} {children}
      </div>
    </StyledNameCardDefault>
  );
}

NameCardLarge.propTypes = {
  children: PropTypes.string.isRequired,
  label: PropTypes.string,
};

NameCardLarge.defaultProps = {
  label: "",
};

export default NameCardLarge;
