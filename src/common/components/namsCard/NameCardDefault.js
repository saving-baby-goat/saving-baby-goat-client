import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNameCardDefault = styled.div`
  width: 20%;
  height: 7rem;
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

function NameCardDefault({ contents }) {
  return (
    <StyledNameCardDefault>
      <div className="name-card">닉네임 : {contents}</div>
    </StyledNameCardDefault>
  );
}

NameCardDefault.propTypes = {
  contents: PropTypes.string.isRequired,
};

export default NameCardDefault;
