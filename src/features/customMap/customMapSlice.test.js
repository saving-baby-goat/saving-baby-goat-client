import { NODE_STATE } from "../../common/util/constants";
import customMapReducer, {
  setCustomMap,
  setCurrnetSelectorState,
  setCurrnetNodeState,
  setStateInitialization,
} from "./customMapSlice";

describe("customMapSlice", () => {
  const initialState = customMapReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = {
      nodeList: {
        byId: {},
        allIds: [[]],
      },
      currentSelectorState: NODE_STATE.MINERAL,
      isGoatOnBoard: false,
    };
  });

  it("should has initial stste", () => {
    expect(state).toEqual({
      nodeList: {
        byId: {},
        allIds: [[]],
      },
      currentSelectorState: NODE_STATE.MINERAL,
      isGoatOnBoard: false,
    });
  });

  it("setCustomMap", () => {
    state = customMapReducer(state, setCustomMap());

    expect(state.nodeList.allIds.length).toEqual(15);
    expect(state.nodeList.allIds[0].length).toEqual(31);
  });

  it("setCurrnetSelectorState", () => {
    state = customMapReducer(state, setCurrnetSelectorState(NODE_STATE.GOAT));
    expect(state.currentSelectorState).toEqual(NODE_STATE.GOAT);

    state = customMapReducer(
      state,
      setCurrnetSelectorState(NODE_STATE.MINERAL)
    );
    expect(state.currentSelectorState).toEqual(NODE_STATE.MINERAL);

    state = customMapReducer(state, setCurrnetSelectorState(NODE_STATE.BOMB));
    expect(state.currentSelectorState).toEqual(NODE_STATE.BOMB);

    state = customMapReducer(state, setCurrnetSelectorState(NODE_STATE.ROCK));
    expect(state.currentSelectorState).toEqual(NODE_STATE.ROCK);
  });

  it("setCurrnetNodeState", () => {
    state = customMapReducer(state, setCustomMap());
    const nodeId = "0-0";
    const payload = {
      nodeId,
      currentSelectorState: NODE_STATE.MINERAL,
    };

    state = customMapReducer(state, setCurrnetNodeState(payload));
    expect(state.nodeList.byId[nodeId].nodeState).toEqual(NODE_STATE.MINERAL);
  });

  it("setStateInitialization", () => {
    state = customMapReducer(state, setStateInitialization());

    expect(state).toEqual({
      nodeList: {
        byId: {},
        allIds: [[]],
      },
      currentSelectorState: NODE_STATE.MINERAL,
      isGoatOnBoard: false,
    });
  });
});
