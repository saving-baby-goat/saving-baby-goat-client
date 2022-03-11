import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, cleanup } from "../../common/util/testUtils";
import Intro from "./Intro";
import { initialState as introInitialState } from "./introSlice";

describe("Intro", () => {
  const initialReduxState = {
    intro: JSON.parse(JSON.stringify(introInitialState)),
  };

  const wrappedIntroComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );

  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
  });

  test("should render Intro Page when first access", () => {
    render(wrappedIntroComponent);

    expect(screen.getByText("염소를 구해라 ~ !!"));
    expect(screen.getByText("출 발 !!"));
  });

  test("should render mocked User nickname", () => {
    initialReduxState.intro.nickname = "testnick";

    render(wrappedIntroComponent, {
      preloadedState: initialReduxState,
    });

    expect(screen.getByText("게임 시작")).toBeInTheDocument();
    expect(screen.getByText("Custom Map 제작")).toBeInTheDocument();
    expect(screen.getByText("닉네임 : testnick")).toBeInTheDocument();
  });
});
