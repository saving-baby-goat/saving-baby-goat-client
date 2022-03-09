import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import GlobalStyle from "./common/components/GlobalStyle";
import CustomMapCreate from "./features/customMap/CustomMapCreate";
import CustomMapList from "./features/customMap/CustomMapList";
import Game from "./features/game/Game";
import Intro from "./features/intro/Intro";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/game/:level" element={<Game />} />
          <Route path="/customMapCreate" element={<CustomMapCreate />} />
          <Route path="/customMapList" element={<CustomMapList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
