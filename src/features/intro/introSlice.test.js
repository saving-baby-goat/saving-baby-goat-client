import introReducer, { setNickname } from "./introSlice";

describe("introSlice", () => {
  const initialState = introReducer(undefined, {});
  let state = initialState;

  it("should has initial stste", () => {
    expect(initialState).toEqual({
      nickname: "",
    });
  });

  it("setNickname", () => {
    state = introReducer(initialState, setNickname("testtest"));

    expect(state.nickname).toEqual("testtest");
  });
});
