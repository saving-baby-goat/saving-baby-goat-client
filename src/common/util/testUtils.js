/* eslint-disable react/prop-types */
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import customMapReducer from "../../features/customMap/customMapSlice";
import gameReducer from "../../features/game/gameSlice";
import introReducer from "../../features/intro/introSlice";
import socketMiddleware from "../middlewares/socketMiddleware";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        intro: introReducer,
        game: gameReducer,
        customMap: customMapReducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
