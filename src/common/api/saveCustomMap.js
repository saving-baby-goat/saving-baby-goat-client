import axios from "axios";

async function saveCustomMap(customMapInfo) {
  const response = await axios.post("/customMap", customMapInfo);

  return response;
}

export default saveCustomMap;
