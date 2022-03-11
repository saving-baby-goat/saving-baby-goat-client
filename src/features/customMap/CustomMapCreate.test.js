import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "../../common/util/testUtils";
import CustomMapCreate from "./CustomMapCreate";
import { initialState as customMapSlice } from "./customMapSlice";

describe("Cusmtom Map Carete", () => {
  const initialReduxState = {
    customMap: JSON.parse(JSON.stringify(customMapSlice)),
  };

  const wrappedCustomMapCreateComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/customMapCreate" element={<CustomMapCreate />} />
      </Routes>
    </BrowserRouter>
  );

  beforeEach(() => {
    render(<div id="root" />);

    window.history.pushState({}, "", "/customMapCreate");

    render(wrappedCustomMapCreateComponent, {
      preloadedState: initialReduxState,
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("should render Custom Map Create page when first access", () => {
    expect(screen.getByText("CUSTOM_MAP"));
    expect(screen.getByText("맵 이름 :"));
    expect(screen.getByText("SAVE"));
    expect(screen.getByText("종료하기"));
  });

  test("should show modal with message : 맵 이름은 1 ~ 20자 입니다.", async () => {
    const cusmtomMapSaveButtonElement = screen.getByText("SAVE");

    fireEvent.click(cusmtomMapSaveButtonElement);

    const test = await screen.findByText("맵 이름은 1 ~ 20자 입니다.");

    expect(test).toBeInTheDocument();
  });

  test("should show modal with message : 염소위치를 정해주세요!", async () => {
    const cusmtomMapSaveButtonElement = screen.getByText("SAVE");
    const input = screen.getByPlaceholderText("20자 이내로 입력해 주세요");
    const goatPosition = screen.getAllByRole("button")[236];

    fireEvent.change(input, { target: { value: "test Map" } });
    fireEvent.click(goatPosition);
    fireEvent.click(cusmtomMapSaveButtonElement);

    const test = await screen.findByText("염소위치를 정해주세요!");

    expect(test).toBeInTheDocument();
  });

  test("should show modal with message : 미네랄 갯수는 최소 2개 이상이어야 합니다.", async () => {
    const cusmtomMapSaveButtonElement = screen.getByText("SAVE");
    const goatButton = screen.getByAltText("goat");
    const input = screen.getByPlaceholderText("20자 이내로 입력해 주세요");
    const goatPosition = screen.getAllByRole("button")[236];

    fireEvent.change(input, { target: { value: "test Map" } });
    fireEvent.click(goatButton);
    fireEvent.click(goatPosition);
    fireEvent.click(cusmtomMapSaveButtonElement);

    const test = await screen.findByText(
      "미네랄 갯수는 최소 2개 이상이어야 합니다."
    );

    expect(test).toBeInTheDocument();
  });
});
