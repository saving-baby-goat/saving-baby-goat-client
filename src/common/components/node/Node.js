// import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledNode = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${COLOR.BROWN};
  border: 1px solid ${COLOR.BLACK};
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Node() {
  return (
    <StyledNode>
      <div>1</div>
    </StyledNode>
  );
}

export default Node;
