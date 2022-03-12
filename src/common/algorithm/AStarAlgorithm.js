import { NODE_STATE } from "../util/constants";

export default function AStarAlgorithm(nodeList, startNodeId, endNodeId) {
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
