import React from "react";
import styled from "styled-components";

import { LEVEL } from "../../util/constants";
import NameCardDefault from "../nameCard/NameCardDefault";
import Selector from "../selector/Selector";

const StyledNavCustomMap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 8rem;
  padding: 10px;

  .optionButton {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }
`;

function NavCustomMap() {
  return (
    <StyledNavCustomMap>
      <div className="optionButton">
        <NameCardDefault>{LEVEL.CUSTOM_MAP}</NameCardDefault>
      </div>
      <Selector />
    </StyledNavCustomMap>
  );
}

export default NavCustomMap;
