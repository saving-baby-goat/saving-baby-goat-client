import {
  BOARD_SIZE,
  CURRNET_GAME_STATE_OPTIONS,
  NODE_STATE,
} from "./constants";

// 여기 삭제
function proxy(list) {
  const result = [];
  for (let i = 0; i < list; i++) {
    result.push(list[i]);
  }
}

export function findShortestPath(
  nodeList,
  mineralNodeIdList,
  startNodeId,
  goatNodeId
) {
  proxy(mineralNodeIdList);
  const permutedList = getPermutations(mineralNodeIdList, 2);

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

    if (!i) {
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
    // visitedNodeList.push(currentNode);
    if (currentNode === endNode) {
      let temp = currentNode;
      path.push(temp);
      while (temp.parents) {
        temp = temp.parents;
        path.push(temp);
      }
      // return { path, visitedNodeList };
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
        if (currentNeighborNode.nodeState === NODE_STATE.ROCKS) {
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
  const { currentNodeY, currentNodeX } = currentNode.id.split("-").map(Number);
  const { targetNodeY, targetNodeX } = targetNode.id.split("-").map(Number);
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
