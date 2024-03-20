import axios from "axios";

const MAP_BASE_URL = "https://challenge.crossmint.io/api/map";
const CANDIDATE_ID = process.env.CANDIDATE_ID;

export async function fetchMapState() {
  try {
    const response = await axios.get(`${MAP_BASE_URL}/${CANDIDATE_ID}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch map state:", error.message);
    throw error;
  }
}

export async function fetchGoal() {
  try {
    const response = await axios.get(`${MAP_BASE_URL}/${CANDIDATE_ID}/goal`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch map gaol:", error.message);
    throw error;
  }
}

export function displayMapContent(mapData) {
  const { content } = mapData.map;
  const tableData = content.map((row) =>
    row.map((cell) => (cell === null ? "" : cell.type))
  );
  console.log("Current Map State:")
  console.table(tableData);
}

export async function fetchAndUpdateMap() {
  const mapData = await fetchMapState();
  displayMapContent(mapData);
  return mapData;
}

export async function getLogoCordinates() {
  const coordinates = await fetchGoal();
  return coordinates.goal
}
