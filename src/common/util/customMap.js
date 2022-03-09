import { NODE_STATE } from "./constants";

export default function createNewCustomMap(heightCount, widthCount) {
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
        isStartPath: false,
      };

      nodeList.byId[newNodeId] = newNode;
      newRowIds.push(newNodeId);
    }
    nodeList.allIds.push(newRowIds);
  }

  return nodeList;
}
