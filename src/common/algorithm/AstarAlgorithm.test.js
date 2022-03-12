import mockCustomMapState from "../util/mocks/mockCustomMapState";
import AStarAlgorithm from "./AStarAlgorithm";

describe("AStarAlgorithm", () => {
  const startNodeId = "0-0";
  const endNodeId = "7-15";
  const { nodeList } = mockCustomMapState;

  it("should be find shortest path", () => {
    const test = AStarAlgorithm(nodeList, startNodeId, endNodeId);
    const result = [];
    for (const node of test) {
      result.push(node.id);
    }
    expect(result).toEqual([
      "7-15",
      "6-15",
      "6-14",
      "5-14",
      "4-14",
      "3-14",
      "2-14",
      "1-14",
      "0-14",
      "0-13",
      "0-12",
      "1-12",
      "2-12",
      "3-12",
      "4-12",
      "5-12",
      "6-12",
      "6-11",
      "6-10",
      "5-10",
      "4-10",
      "3-10",
      "2-10",
      "1-10",
      "1-9",
      "1-8",
      "2-8",
      "3-8",
      "4-8",
      "5-8",
      "6-8",
      "6-7",
      "6-6",
      "5-6",
      "4-6",
      "3-6",
      "2-6",
      "1-6",
      "0-6",
      "0-5",
      "0-4",
      "0-3",
      "0-2",
      "1-2",
      "2-2",
      "3-2",
      "4-2",
      "5-2",
      "6-2",
      "6-1",
      "6-0",
      "5-0",
      "4-0",
      "3-0",
      "2-0",
      "1-0",
      "0-0",
    ]);
  });
});
