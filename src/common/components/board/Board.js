import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { COLOR } from "../../util/constants";
import NameCardTiny from "../nameCard/NameCardTiny";
import Node from "../node/Node";

const StyledBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .nodeList {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .nodeListRow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

function Board() {
  const nodeList = useSelector((state) => state.game.nodeList);
  const player1Nickname = useSelector((state) => state.game.player1Nickname);
  const player2Nickname = useSelector((state) => state.game.player2Nickname);
  return (
    <StyledBoard>
      <NameCardTiny color={COLOR.BLUE}>{player1Nickname}</NameCardTiny>
      <div className="nodeList">
        {nodeList.allIds.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="nodeListRow" key={index}>
            {row.map((nodeId) => (
              <Node nodeId={nodeId} key={nodeId} />
            ))}
          </div>
        ))}
      </div>
      <NameCardTiny color={COLOR.GREEN}>{player2Nickname}</NameCardTiny>
    </StyledBoard>
  );
}

export default Board;