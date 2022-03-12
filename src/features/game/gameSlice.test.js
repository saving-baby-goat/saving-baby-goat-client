import {
  CURRNET_GAME_STATE_OPTIONS,
  LEVEL,
  NODE_STATE,
} from "../../common/util/constants";
import mockCustomMapState from "../../common/util/mocks/mockCustomMapState";
import gameReducer, {
  setGameLevel,
  createGame,
  setNodeState,
  onRollDice,
  setGameInfo,
  setWaitingStatus,
  setMySocketId,
  setMapEqual,
  changeCurrentGameState,
  changePlayerTurn,
  updateMineralCount,
  updateCurrnetGameOver,
  setMineralNodeIdList,
  userLeftGame,
  setStartNodeId,
  setCustomNodeList,
} from "./gameSlice";

describe("gameSlice", () => {
  const initialState = gameReducer(undefined, {});
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });

  it("should has initial stste", () => {
    expect(state).toEqual(initialState);
  });

  it("setGameLevel", () => {
    state = gameReducer(state, setGameLevel(LEVEL.HARD));

    expect(state.gameLevel).toEqual(LEVEL.HARD);
  });

  it("createGame", () => {
    const payload = LEVEL.HARD;
    state = gameReducer(state, createGame(payload));

    expect(Object.keys(state.nodeList.byId).length).toEqual(465);
    expect(state.nodeList.allIds.length).toEqual(15);
    expect(state.nodeList.allIds[0].length).toEqual(31);
  });

  it("setNodeState", () => {
    const nodeId = "0-0";

    state = gameReducer(state, createGame(LEVEL.HARD));

    const payload = {
      nodeId,
      isStart: true,
      currentGameState: CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN,
      option: "",
    };

    state = gameReducer(state, setNodeState(payload));

    expect(state.nodeList.byId[nodeId]).toEqual({
      id: nodeId,
      nodeState: NODE_STATE.PLAYER_1_PATH,
      isStartPath: true,
    });
  });

  it("onRollDice", () => {
    const payload = 6;

    state = gameReducer(state, onRollDice(payload));

    expect(state.moveCount).toEqual(6);
  });

  it("setGameInfo", () => {
    const currentGameRoomId = "room-1234567890";
    const player1Nickname = "test1";
    const player2Nickname = "test2";
    const player1SocketId = "1234567890";
    const player2SocketId = "0987654321";
    const currnetPlayerSocketId = "1234567890";

    const payload = {
      currentGameRoomId,
      player1Nickname,
      player2Nickname,
      player1SocketId,
      player2SocketId,
      currnetPlayerSocketId,
      level: LEVEL.NORMAL,
    };
    state = gameReducer(state, setGameInfo(payload));

    expect(state.currentGameRoomId).toEqual(currentGameRoomId);
    expect(state.player1Nickname).toEqual(player1Nickname);
    expect(state.player2Nickname).toEqual(player2Nickname);
    expect(state.player1SocketId).toEqual(player1SocketId);
    expect(state.player2SocketId).toEqual(player2SocketId);
    expect(state.currentGameState).toEqual(CURRNET_GAME_STATE_OPTIONS.START);
    expect(state.isGameOver).toEqual(false);
    expect(state.isMyTurn).toEqual(true);
  });

  it("setWaitingStatus", () => {
    state = gameReducer(state, setWaitingStatus());

    expect(state.currentGameState).toEqual(CURRNET_GAME_STATE_OPTIONS.WAITING);
  });

  it("setMySocketId", () => {
    const payload = "1234567890";
    state = gameReducer(state, setMySocketId(payload));

    expect(state.mySocketId).toEqual(payload);
  });

  it("setMapEqual", () => {
    const currentGameRoomId = "room-1234567890";
    const player1Nickname = "test1";
    const player2Nickname = "test2";
    const player1SocketId = "1234567890";
    const player2SocketId = "0987654321";
    const currnetPlayerSocketId = "1234567890";

    const gameInfo = {
      currentGameRoomId,
      player1Nickname,
      player2Nickname,
      player1SocketId,
      player2SocketId,
      currnetPlayerSocketId,
      level: LEVEL.NORMAL,
    };
    state = gameReducer(state, setGameInfo(gameInfo));
    state = gameReducer(state, createGame(LEVEL.EASY));

    const payload = {
      nodeList: state.nodeList,
      currentSocketId: currnetPlayerSocketId,
    };

    state = gameReducer(state, setMapEqual(payload));

    expect(state.nodeList).toEqual(payload.nodeList);
  });

  it("changeCurrentGameState", () => {
    const payload = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;

    state = gameReducer(state, changeCurrentGameState(payload));

    expect(state.currentGameState).toEqual(payload);
  });

  it("changePlayerTurn", () => {
    const payload = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;

    state = gameReducer(state, changePlayerTurn(payload));

    expect(state.currentGameState).toEqual(
      CURRNET_GAME_STATE_OPTIONS.PLAYER_2_TURN
    );
  });

  it("updateMineralCount", () => {
    const payload = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;

    state = gameReducer(state, updateMineralCount(payload));

    expect(state.player1MineralCount).toEqual(1);
  });

  it("updateCurrnetGameOver", () => {
    const payload = CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN;

    state = gameReducer(state, updateCurrnetGameOver(payload));

    expect(state.isGameOver).toEqual(true);
    expect(state.currentGameState).toEqual(
      CURRNET_GAME_STATE_OPTIONS.PLAYER_1_WIN
    );
  });

  it("setMineralNodeIdList", () => {
    const payload = [
      "1-16",
      "3-30",
      "5-12",
      "8-9",
      "8-26",
      "9-11",
      "9-23",
      "10-3",
      "10-22",
    ];
    state = gameReducer(state, setMineralNodeIdList(payload));

    expect(state.mineralNodeIdList).toEqual(payload);
  });

  it("userLeftGame", () => {
    state = gameReducer(state, userLeftGame());

    expect(state).toEqual({
      gameLevel: LEVEL.EASY,
      isGameOver: false,
      isGameConnected: false,
      nodeList: {
        byId: {},
        allIds: [[]],
      },
      moveCount: 0,
      isMyTurn: false,
      mySocketId: "",
      player1StartNodeId: "",
      player2StartNodeId: "",
      player1Nickname: "",
      player2Nickname: "",
      currentGameRoomId: "",
      player1SocketId: "",
      player2SocketId: "",
      currentGameState: "",
      player1MineralCount: 0,
      player2MineralCount: 0,
      mineralNodeIdList: [],
    });
  });

  it("setStartNodeId", () => {
    const payload = "0-0";
    state = gameReducer(
      state,
      changeCurrentGameState(CURRNET_GAME_STATE_OPTIONS.PLAYER_1_TURN)
    );
    state = gameReducer(state, setStartNodeId(payload));

    expect(state.player1StartNodeId).toEqual(payload);
  });

  it("setCustomNodeList", () => {
    const payload = mockCustomMapState.nodeList;
    state = gameReducer(state, setCustomNodeList(payload));

    expect(state.nodeList).toEqual(payload);
    expect(state.mineralNodeIdList).toEqual([
      "1-5",
      "1-25",
      "6-14",
      "6-16",
      "8-14",
      "8-16",
      "13-5",
      "13-25",
    ]);
  });
});
