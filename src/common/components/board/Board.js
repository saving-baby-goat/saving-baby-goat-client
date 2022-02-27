import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";
import NameCardTiny from "../nameCard/NameCardTiny";

const StyledBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .sample {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Board() {
  return (
    <StyledBoard>
      <NameCardTiny color={COLOR.BLUE}>1p</NameCardTiny>
      <div className="sample">보드</div>
      <NameCardTiny color={COLOR.GREEN}>2p</NameCardTiny>
    </StyledBoard>
  );
}

export default Board;
