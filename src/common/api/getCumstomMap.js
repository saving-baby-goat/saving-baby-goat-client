import axios from "axios";

async function getCustomMapList() {
  const response = await axios.get("/customMap");

  return response.data.customMapList;
}

export default getCustomMapList;
