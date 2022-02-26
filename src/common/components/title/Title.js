import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledTitle = styled.div`
  width: 30rem;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5rem solid ${COLOR.BLACK};
  background: linear-gradient(to top, ${COLOR.HEAVY_GREY}, ${COLOR.LIGHT_GREY});

  .title {
    font-size: 2rem;
  }
`;

function Title() {
  return (
    <StyledTitle>
      <div className="title">염소를 구해라 ~ !! </div>
    </StyledTitle>
  );
}

export default Title;
