import { DECIMAL, MINERAL_PERCENTAGE, NODE_STATE } from "./constants";

export function hasNearPlayerPath(nodeList, nodeId) {
  const rowNumber = parseInt(nodeId.split("-")[0], DECIMAL);
  const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

  const direction = {
    left: `${rowNumber}-${columnNumber - 1}`,
    right: `${rowNumber}-${columnNumber + 1}`,
    up: `${rowNumber + 1}-${columnNumber}`,
    down: `${rowNumber - 1}-${columnNumber}`,
  };

  if (nodeList.byId[direction.left]?.nodeState === NODE_STATE.PLAYER_1_PATH) {
    return true;
  }
  if (nodeList.byId[direction.right]?.nodeState === NODE_STATE.PLAYER_1_PATH) {
    return true;
  }
  if (nodeList.byId[direction.up]?.nodeState === NODE_STATE.PLAYER_1_PATH) {
    return true;
  }
  if (nodeList.byId[direction.down]?.nodeState === NODE_STATE.PLAYER_1_PATH) {
    return true;
  }

  if (nodeList.byId[direction.left]?.nodeState === NODE_STATE.PLAYER_2_PATH) {
    return true;
  }
  if (nodeList.byId[direction.right]?.nodeState === NODE_STATE.PLAYER_2_PATH) {
    return true;
  }
  if (nodeList.byId[direction.up]?.nodeState === NODE_STATE.PLAYER_2_PATH) {
    return true;
  }
  if (nodeList.byId[direction.down]?.nodeState === NODE_STATE.PLAYER_2_PATH) {
    return true;
  }

  return false;
}

export function createNodelist(heightCount, widthCount) {
  const heightCenter = parseInt(heightCount / 2, DECIMAL);
  const widthCenter = parseInt(widthCount / 2, DECIMAL);

  const nodeList = {
    byId: {},
    allIds: [],
  };

  for (let j = 0; j < heightCount; j++) {
    const newRowIds = [];

    for (let i = 0; i < widthCount; i++) {
      const newNodeId = `${j}-${i}`;

      const newNode = {
        id: newNodeId,
        nodeState: NODE_STATE.DEFAULT,
      };
      if (j === heightCenter && i === widthCenter) {
        newNode.nodeState = NODE_STATE.GOAT;
      }

      nodeList.byId[newNodeId] = newNode;
      newRowIds.push(newNodeId);
    }
    nodeList.allIds.push(newRowIds);
  }
  const applyRandomMineralNodeList = createRandomMineral(
    nodeList,
    heightCount,
    widthCount
  );

  return applyRandomMineralNodeList;
}

function createRandomMineral(nodeList, heightCount, widthCount) {
  const widthCenter = parseInt(widthCount / 2, DECIMAL);
  const calculateMineralCount = parseInt(
    heightCount * widthCenter * MINERAL_PERCENTAGE,
    DECIMAL
  );
  const mineralCount = calculateMineralCount > 3 ? calculateMineralCount : 3;
  const nodeCount = heightCount * widthCenter;

  const RandomNumberListLeftSide = getRandomNumberList(
    0,
    nodeCount,
    mineralCount
  );

  const RandomNumberListRightSide = getRandomNumberList(
    0,
    nodeCount,
    mineralCount
  );

  nodeList = setMineralNodeList(
    heightCount,
    0,
    widthCenter,
    RandomNumberListLeftSide,
    nodeList
  );

  nodeList = setMineralNodeList(
    heightCount,
    widthCenter + 1,
    widthCount,
    RandomNumberListRightSide,
    nodeList
  );
  return nodeList;
}

function setMineralNodeList(
  heightCount,
  widthStart,
  widthEnd,
  randomNumerList,
  nodeList
) {
  let count = 0;

  for (let j = 0; j < heightCount; j++) {
    for (let i = widthStart; i < widthEnd; i++) {
      count++;
      if (count === randomNumerList[randomNumerList.length - 1]) {
        randomNumerList.pop();
        nodeList.byId[`${j}-${i}`].nodeState = NODE_STATE.MINERAL;
      }
    }
  }
  return nodeList;
}

function getRandomNumberList(min, max, count) {
  const numberList = [];

  for (let i = 0; i < count; i++) {
    const newRandomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (numberList.includes(newRandomNumber)) {
      i--;
      continue;
    }
    numberList.push(newRandomNumber);
  }

  return numberList.sort((a, b) => b - a);
}
