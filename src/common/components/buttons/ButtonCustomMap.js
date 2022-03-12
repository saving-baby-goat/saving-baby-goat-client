import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { setGameLevel } from "../../../features/game/gameSlice";
import { socketConnected } from "../../middlewares/socketMiddleware";
import { COLOR, LEVEL } from "../../util/constants";

const StyledButtonCustomMap = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
  height: 4.5rem;
  margin: 1rem 4rem;
  border: 0.2rem solid black;
  border-radius: 2rem;
  background-color: ${COLOR.DARK_BROWN};
  font-size: 1.5rem;
  font-weight: bold;

  cursor: pointer;

  .info1 {
    width: 50%;
  }

  .info2 {
    width: 30%;
  }
`;

function ButtonCustomMap({ customMap }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nickname = useSelector((state) => state.intro.nickname);

  function handleCusomMapButtonClick() {
    const level = LEVEL.CUSTOM_MAP;
    const customMapId = customMap._id;
    dispatch(setGameLevel(level));
    dispatch(socketConnected(level, nickname, customMapId));
    navigate(`/game/${LEVEL.CUSTOM_MAP}`, { state: customMap.nodeList });
  }

  return (
    <StyledButtonCustomMap onClick={handleCusomMapButtonClick}>
      <div className="info1">
        <div>맵 이름 : {customMap.mapName}</div>
        <div>만든 사람 : {customMap.maker}</div>
      </div>
      <div className="info2">
        <div>{customMap.count} 회 Play</div>
      </div>
    </StyledButtonCustomMap>
  );
}

ButtonCustomMap.propTypes = {
  customMap: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    mapName: PropTypes.string.isRequired,
    nodeList: PropTypes.shape({
      allIds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
      byId: PropTypes.shape({
        id: PropTypes.string,
        nodeState: PropTypes.string,
        isStartPath: PropTypes.bool,
      }),
    }),
    maker: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default ButtonCustomMap;
