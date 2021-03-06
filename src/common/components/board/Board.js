/* eslint-disable react/no-array-index-key */
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { COLOR } from "../../util/constants";
import NameCardPlayerInfo from "../nameCard/NameCardPlayerInfo";
import Node from "../node/Node";

const StyledBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .nodeList {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .nodeListRow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .playerInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;

function Board() {
  const nodeList = useSelector((state) => state.game.nodeList);
  const player1Nickname = useSelector((state) => state.game.player1Nickname);
  const player2Nickname = useSelector((state) => state.game.player2Nickname);
  const player1MineralCount = useSelector(
    (state) => state.game.player1MineralCount
  );
  const player2MineralCount = useSelector(
    (state) => state.game.player2MineralCount
  );

  return (
    <StyledBoard>
      <div className="playerInfo">
        <NameCardPlayerInfo
          color={COLOR.BLUE}
          playerNickname={player1Nickname}
          mineralCount={`${player1MineralCount} / 2`}
        />
      </div>
      <div className="nodeList">
        {nodeList.allIds.map((row, index) => (
          <div className="nodeListRow" key={index}>
            {row.map((nodeId) => (
              <Node nodeId={nodeId} key={nodeId} />
            ))}
          </div>
        ))}
      </div>
      <div className="playerInfo">
        <NameCardPlayerInfo
          color={COLOR.GREEN}
          playerNickname={player2Nickname}
          mineralCount={`${player2MineralCount} / 2`}
        />
      </div>
    </StyledBoard>
  );
}

export default Board;
