import React from "react";
import styled from "styled-components";

import { LEVEL } from "../../util/constants";
import NameCardDefault from "../nameCard/NameCardDefault";
import Selector from "../selector/Selector";

const StyledNavCustomMap = styled.div`
  width: 80%;
  height: 15rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;

  .optionButton {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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
