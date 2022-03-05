// export function AStartAlgorithm(byId, startNodeId, targetNodeId) {
//   const unvisitedNodeIdList = Object.keys(byId);
//   const animatedNodeIds = [];
//   let currentNode = byId[startNodeId];
//   console.log("currentNode", currentNode);

//   currentNode.distance = 0;
//   currentNode.fDistance = 0;

//   while (unvisitedNodeIdList.length) {
//     let currentNodeId = getShortestDistanceNodeIdAStar(
//       unvisitedNodeIdList,
//       byId
//     );

//     currentNode = byId[currentNodeId];

//     while (currentNode.status === "WALL" && unvisitedNodeIdList.length) {
//       currentNodeId = getShortestDistanceNodeIdAStar(unvisitedNodeIdList, byId);
//       currentNode = byId[currentNodeId];
//     }

//     if (currentNode.distance === Infinity) {
//       break;
//     }

//     animatedNodeIds.push(currentNodeId);
//     console.log("1234");
//     if (currentNodeId === targetNodeId) {
//       return { message: "PROGRESS_RESULT.SUCCESS", animatedNodeIds };
//     }

//     const nextNodes = getNextNodes(currentNode.id, byId);

//     // eslint-disable-next-line no-loop-func
//     nextNodes.forEach((nextNode) => {
//       if (nextNode.status === "WALL") {
//         return;
//       }

//       // NOTE: A* 알고리즘은 Dijkstra에서 hn(휴리스틱)을 추가한 알고리즘이다.
//       // A* 알고리즘 평가 함수: fn = gn + hn
//       // fDistance = gDistance + hDistance
//       // gn: 출발에서 지금(n) 까지의 경로 가중치
//       // hn: 지금(n) 부터 목표까지의 경로 가중치 - (n ~ 목표 거리(manhattan 거리) 계산)
//       // https://ko.wikipedia.org/wiki/A*_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

//       const gDistance = currentNode.distance + nextNode.weight;

//       if (!nextNode.hDistance) {
//         nextNode.hDistance = manhattanDistance(nextNode.id, targetNodeId);
//       }

//       if (gDistance < nextNode.distance) {
//         Object.assign(nextNode, {
//           distance: gDistance,
//           fDistance: gDistance + nextNode.hDistance,
//           previousNodeId: currentNode.id,
//         });
//       }
//     });
//   }

//   return { message: "PROGRESS_RESULT.FAILURE", animatedNodeIds };
// }

// export function getShortestDistanceNodeIdAStar(unvisitedNodeIdList, byId) {
//   if (!unvisitedNodeIdList.length) {
//     return;
//   }

//   let index = 0;
//   let shortestDistanceNodeId = unvisitedNodeIdList[index];

//   for (let i = 1; i < unvisitedNodeIdList.length; i++) {
//     const nodeId = unvisitedNodeIdList[i];

//     if (byId[shortestDistanceNodeId].fDistance > byId[nodeId].fDistance) {
//       shortestDistanceNodeId = nodeId;
//       index = i;
//     } else if (
//       byId[shortestDistanceNodeId].fDistance === byId[nodeId].fDistance &&
//       byId[shortestDistanceNodeId].hDistance > byId[nodeId].hDistance
//     ) {
//       shortestDistanceNodeId = nodeId;
//       index = i;
//     }
//   }

//   unvisitedNodeIdList.splice(index, 1);

//   // eslint-disable-next-line consistent-return
//   return shortestDistanceNodeId;
// }

// export function manhattanDistance(nextNodeId, targetNodeId) {
//   const [nextY, nextX] = nextNodeId.split("-").map(Number);
//   const [targetY, targetX] = targetNodeId.split("-").map(Number);

//   return Math.abs(targetY - nextY) + Math.abs(targetX - nextX);
// }

// const sumOfArrayElement = (array1, array2) => [
//   array1[0] + array2[0],
//   array1[1] + array2[1],
// ];

// export function getNextNodes(centerNodeId, byId) {
//   const [i, j] = centerNodeId.split("-").map(Number);

//   if (typeof i !== "number" || typeof j !== "number") {
//     throw new Error("getNextNodes parameter(centerNodeId) format error.");
//   }

//   const nextNodes = [];
//   const OFFSET = {
//     0: [-1, 0],
//     1: [0, 1],
//     2: [1, 0],
//     3: [0, -1],
//   };

//   for (let k = 0; k < Object.keys(OFFSET).length; k++) {
//     const candidateNodeIndex = sumOfArrayElement([i, j], OFFSET[k]);
//     const candidateNodeId = `${candidateNodeIndex[0]}-${candidateNodeIndex[1]}`;
//     const candidateNode = byId[candidateNodeId];

//     if (candidateNode && candidateNode.status !== "WALL") {
//       nextNodes.unshift(candidateNode);
//     }
//   }

//   return nextNodes;
// }

// export default {
//   AStartAlgorithm,
//   getShortestDistanceNodeIdAStar,
//   manhattanDistance,
//   getNextNodes,
// };
