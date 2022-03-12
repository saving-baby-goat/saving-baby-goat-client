import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { setCustomMap } from "../../../features/customMap/customMapSlice";
import NodeCostom from "../node/NodeCostom";

const StyledBoardCustomMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

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
`;

function BoardCustomMap() {
  const nodeList = useSelector((state) => state.customMap.nodeList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCustomMap());
  }, []);

  return (
    <StyledBoardCustomMap>
      <div className="nodeList">
        {nodeList.allIds.map((row, index) => (
          <div className="nodeListRow" key={row[index]}>
            {row.map((nodeId) => (
              <NodeCostom nodeId={nodeId} key={nodeId} />
            ))}
          </div>
        ))}
      </div>
    </StyledBoardCustomMap>
  );
}

export default BoardCustomMap;
