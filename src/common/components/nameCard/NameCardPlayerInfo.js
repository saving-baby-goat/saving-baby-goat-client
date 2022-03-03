import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import MINERAL from "../../../assets/mineral.png";

const StyledNameCardPlayerInfo = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border: 0.2rem solid black;
  border-radius: 2rem;

  .playerNickname {
    font-size: 2rem;
    font-weight: bold;
  }
  .mineralCount {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.5rem;
  }
  .image {
    height: 3rem;
    width: 3rem;
    margin: 0.5rem;
  }
`;

function NameCardPlayerInfo({ color, playerNickname, mineralCount }) {
  return (
    <StyledNameCardPlayerInfo color={color}>
      <div className="playerNickname">{playerNickname}</div>
      <div className="mineralCount">
        <img className="image" src={MINERAL} alt="mineral" />: {mineralCount}
      </div>
    </StyledNameCardPlayerInfo>
  );
}

NameCardPlayerInfo.propTypes = {
  color: PropTypes.string.isRequired,
  playerNickname: PropTypes.string.isRequired,
  mineralCount: PropTypes.number.isRequired,
};

export default NameCardPlayerInfo;
