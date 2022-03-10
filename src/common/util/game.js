import {
  BOARD_SIZE,
  BOMB_PERCENTAGE,
  CURRNET_GAME_STATE_OPTIONS,
  DECIMAL,
  LEVEL,
  MINERAL_PERCENTAGE,
  NODE_STATE,
  ROCK_PERCENTAGE,
  VICTORY_MINERAL_COUNT,
} from "./constants";

export function findShortestPath(
  nodeList,
  mineralNodeIdList,
  startNodeId,
  goatNodeId
) {
  const permutedList = getPermutations(
    mineralNodeIdList,
    VICTORY_MINERAL_COUNT
  );

  for (let i = 0; i < permutedList.length; i++) {
    permutedList[i].unshift(startNodeId);
    permutedList[i].push(goatNodeId);
  }

  let path = [];
  for (let i = 0; i < permutedList.length; i++) {
    let tempPath = [];
    for (let j = 0; j < permutedList[i].length - 1; j++) {
      tempPath = tempPath.concat(
        aStarAlgorithm(nodeList, permutedList[i][j], permutedList[i][j + 1])
      );
    }

    if (tempPath.includes(null)) {
      tempPath = [];
    }

    if (!path.length && !tempPath.length) {
      path = [];
    }

    if (!path.length && tempPath.length) {
      path = tempPath;
    }

    if (path.length >= tempPath.length) {
      path = tempPath;
    }
  }

  return path;
}

export function getPermutations(list, maxLength) {
  if (maxLength === 0) {
    return [[]];
  }

  const result = [];

  for (let i = 0; i < list.length; i++) {
    const copy = [...list];
    const head = copy.splice(i, 1);
    const rest = getPermutations(copy, maxLength - 1);
    for (let j = 0; j < rest.length; j++) {
      const next = head.concat(rest[j]);
      result.push(next);
    }
  }

  return result;
}

export function findStartNodeId(nodeList, currentGameState) {
  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_1_WIN) {
    for (let j = 0; j < BOARD_SIZE.HEIGHT_COUNT; j++) {
      if (nodeList.byId[`${j}-0`].isStartPath) {
        return `${j}-0`;
      }
    }
  }
  if (currentGameState === CURRNET_GAME_STATE_OPTIONS.PLAYER_2_WIN) {
    for (let j = 0; j < BOARD_SIZE.HEIGHT_COUNT; j++) {
      if (nodeList.byId[`${j}-${BOARD_SIZE.WIDTH_COUNT - 1}`].isStartPath) {
        return `${j}-${BOARD_SIZE.WIDTH_COUNT - 1}`;
      }
    }
  }
  return null;
}

export function findGoatNodeId(nodeList) {
  for (let j = 0; j < BOARD_SIZE.HEIGHT_COUNT; j++) {
    for (let i = 0; i < BOARD_SIZE.WIDTH_COUNT; i++) {
      if (nodeList.byId[`${j}-${i}`].nodeState === NODE_STATE.GOAT) {
        return `${j}-${i}`;
      }
    }
  }
  return null;
}

export function findMineralNodeIdList(nodeList) {
  const mineralNodeList = [];

  for (let j = 0; j < BOARD_SIZE.HEIGHT_COUNT; j++) {
    for (let i = 0; i < BOARD_SIZE.WIDTH_COUNT; i++) {
      if (nodeList.byId[`${j}-${i}`].nodeState === NODE_STATE.MINERAL) {
        mineralNodeList.push(`${j}-${i}`);
      }
    }
  }

  return mineralNodeList;
}

export function aStarAlgorithm(nodeList, startNodeId, endNodeId) {
  const nodeListSetNeighborList = setNeighborList(nodeList);
  const startNode = nodeListSetNeighborList.byId[startNodeId];
  const endNode = nodeListSetNeighborList.byId[endNodeId];
  const { byId } = nodeListSetNeighborList;

  let openSet = [];
  const closedSet = [];
  const path = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }
    const currentNode = openSet[leastIndex];
    if (currentNode === endNode) {
      let temp = currentNode;
      path.push(temp);
      while (temp.parents) {
        temp = temp.parents;
        path.push(temp);
      }
      return path;
    }

    openSet = openSet.filter((node) => node !== currentNode);

    closedSet.push(currentNode);

    const { neighborList } = currentNode;
    for (let i = 0; i < neighborList.length; i++) {
      const currentNeighborNode = byId[neighborList[i]];
      if (!closedSet.includes(currentNeighborNode)) {
        const newG = currentNeighborNode.g + 1;
        let newNeighborAccepted = false;
        if (currentNeighborNode.nodeState === NODE_STATE.ROCK) {
          continue;
        }
        if (openSet.includes(currentNeighborNode)) {
          if (newG < currentNeighborNode.g) {
            currentNeighborNode.g = newG;
            newNeighborAccepted = true;
          }
        } else {
          currentNeighborNode.g = newG;
          newNeighborAccepted = true;
          openSet.push(currentNeighborNode);
        }

        if (newNeighborAccepted) {
          currentNeighborNode.h = heuristic(currentNeighborNode, endNode);
          currentNeighborNode.f = currentNeighborNode.g + currentNeighborNode.h;
          currentNeighborNode.parents = currentNode;
        }
      }
    }
  }
  return null;
}

function heuristic(currentNode, targetNode) {
  const [currentNodeY, currentNodeX] = currentNode.id.split("-").map(Number);
  const [targetNodeY, targetNodeX] = targetNode.id.split("-").map(Number);
  return (
    Math.abs(currentNodeY - targetNodeY) + Math.abs(currentNodeX - targetNodeX)
  );
}

function setNeighborList(nodeList) {
  const heightCount = nodeList.allIds.length;
  const widthCount = nodeList.allIds[0].length;

  for (let j = 0; j < nodeList.allIds.length; j++) {
    for (let i = 0; i < nodeList.allIds[j].length; i++) {
      nodeList.byId[`${j}-${i}`].neighborList = [];
      nodeList.byId[`${j}-${i}`].parents = undefined;
      if (i > 0) {
        nodeList.byId[`${j}-${i}`].neighborList.push(`${j}-${i - 1}`);
      }
      if (i < widthCount - 1) {
        nodeList.byId[`${j}-${i}`].neighborList.push(`${j}-${i + 1}`);
      }
      if (j > 0) {
        nodeList.byId[`${j}-${i}`].neighborList.push(`${j - 1}-${i}`);
      }
      if (j < heightCount - 1) {
        nodeList.byId[`${j}-${i}`].neighborList.push(`${j + 1}-${i}`);
      }
    }
  }
  return nodeList;
}

export function createNodelist(heightCount, widthCount, level) {
  const heightCenter = parseInt(heightCount / 2, DECIMAL);
  const widthCenter = parseInt(widthCount / 2, DECIMAL);

  let nodeList = {
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
        isStartPath: false,
      };

      nodeList.byId[newNodeId] = newNode;
      newRowIds.push(newNodeId);
    }
    nodeList.allIds.push(newRowIds);
  }
  //  Bomb
  if (level === LEVEL.HARD) {
    nodeList = createRandomBomb(nodeList, heightCount, widthCount);
  }
  // Rock
  if (level === LEVEL.NORMAL || level === LEVEL.HARD) {
    nodeList = createRandomRock(nodeList, heightCount, widthCount);
  }
  // Mineral
  nodeList = createRandomMineral(nodeList, heightCount, widthCount);

  // Goat
  nodeList.byId[`${heightCenter}-${widthCenter}`].nodeState = NODE_STATE.GOAT;

  return nodeList;
}

function createRandomBomb(nodeList, heightCount, widthCount) {
  const obstacle = NODE_STATE.BOMB;
  const calculateBomb = parseInt(
    heightCount * widthCount * BOMB_PERCENTAGE,
    DECIMAL
  );

  const nodeCount = heightCount * widthCount;

  nodeList = setObstacleNodeList(
    heightCount,
    widthCount,
    getRandomNumberList(0, nodeCount, calculateBomb),
    nodeList,
    obstacle
  );

  return nodeList;
}

function createRandomRock(nodeList, heightCount, widthCount) {
  const obstacle = NODE_STATE.ROCK;
  const calculateRock = parseInt(
    heightCount * widthCount * ROCK_PERCENTAGE,
    DECIMAL
  );
  const nodeCount = heightCount * widthCount;

  nodeList = setObstacleNodeList(
    heightCount,
    widthCount,
    getRandomNumberList(0, nodeCount, calculateRock),
    nodeList,
    obstacle
  );

  return nodeList;
}

function createRandomMineral(nodeList, heightCount, widthCount) {
  const widthCenter = parseInt(widthCount / 2, DECIMAL);
  const calculateMineralCount = parseInt(
    heightCount * widthCenter * MINERAL_PERCENTAGE,
    DECIMAL
  );

  const mineralCount = calculateMineralCount > 3 ? calculateMineralCount : 3;
  const nodeCount = heightCount * widthCenter;

  nodeList = setMineralNodeList(
    heightCount,
    0,
    widthCenter,
    getRandomNumberList(0, nodeCount, mineralCount),
    nodeList
  );

  nodeList = setMineralNodeList(
    heightCount,
    widthCenter + 1,
    widthCount,
    getRandomNumberList(0, nodeCount, mineralCount),
    nodeList
  );

  return nodeList;
}

function setObstacleNodeList(
  heightCount,
  widthCount,
  randomNumberList,
  nodeList,
  obstacle
) {
  let count = 0;
  let randomNumberListIndex = 0;

  for (let j = 0; j < heightCount; j++) {
    for (let i = 0; i < widthCount; i++) {
      if (count === randomNumberList[randomNumberListIndex]) {
        nodeList.byId[`${j}-${i}`].nodeState = obstacle;
        randomNumberListIndex++;
      }

      count++;
    }
  }

  return nodeList;
}

function setMineralNodeList(
  heightCount,
  widthStart,
  widthEnd,
  randomNumberList,
  nodeList
) {
  let count = 0;
  let randomNumberListIndex = 0;

  for (let j = 0; j < heightCount; j++) {
    for (let i = widthStart; i < widthEnd; i++) {
      if (count === randomNumberList[randomNumberListIndex]) {
        nodeList.byId[`${j}-${i}`].nodeState = NODE_STATE.MINERAL;
        randomNumberListIndex++;
      }
      count++;
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

  return numberList.sort((a, b) => a - b);
}
