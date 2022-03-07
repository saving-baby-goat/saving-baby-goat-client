import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNameCardDefault = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b47535;
  border: 0.3rem solid black;
  border-radius: 4rem;

  .name-card {
    font-size: 2rem;
  }
`;

function NameCardDefault({ children, label }) {
  return (
    <StyledNameCardDefault>
      <div className="name-card">
        {label} {children}
      </div>
    </StyledNameCardDefault>
  );
}

NameCardDefault.propTypes = {
  children: PropTypes.string.isRequired,
  label: PropTypes.string,
};

NameCardDefault.defaultProps = {
  label: "",
};

export default NameCardDefault;
