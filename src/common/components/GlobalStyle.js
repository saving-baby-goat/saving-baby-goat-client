import { createGlobalStyle } from "styled-components";

import backgroundImg from "../../assets/background.svg";

const GlobalStyle = createGlobalStyle`
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  body {
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImg});
    font-family: Noto Sans KR, sans-serif;
  }
`;

export default GlobalStyle;
