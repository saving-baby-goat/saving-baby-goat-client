import { DECIMAL, MINERAL_PERCENTAGE } from "./constants";

export function hasNearPlayerPath(nodeList, nodeId) {
  const rowNumber = parseInt(nodeId.split("-")[0], DECIMAL);
  const columnNumber = parseInt(nodeId.split("-")[1], DECIMAL);

  const direction = {
    left: `${rowNumber}-${columnNumber - 1}`,
    right: `${rowNumber}-${columnNumber + 1}`,
    up: `${rowNumber + 1}-${columnNumber}`,
    down: `${rowNumber - 1}-${columnNumber}`,
  };

  if (nodeList.byId[direction.left]?.nodeState === "player1Path") {
    return true;
  }
  if (nodeList.byId[direction.right]?.nodeState === "player1Path") {
    return true;
  }
  if (nodeList.byId[direction.up]?.nodeState === "player1Path") {
    return true;
  }
  if (nodeList.byId[direction.down]?.nodeState === "player1Path") {
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
        nodeState: "default",
      };
      if (j === heightCenter && i === widthCenter) {
        newNode.nodeState = "goat";
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
        nodeList.byId[`${j}-${i}`].nodeState = "mineral";
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
