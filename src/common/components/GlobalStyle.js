import { createGlobalStyle } from "styled-components";

import backgroundImg from "../../assets/background.png";

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  body {
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImg});
    font-family: Noto Sans KR, sans-serif;
  }
`;

export default GlobalStyle;
