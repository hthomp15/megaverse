import {
  polyanetsController,
  soloonsController,
  comethsController,
} from "../controllers/index.js";
import { fetchMapState, getLogoCordinates } from "./mapUtils.js";

// Mapping of astral object types to their respective controllers
const astralObjectControllers = {
  0: polyanetsController,
  1: comethsController,
  2: soloonsController,
};

function getControllerByType(type) {
  return astralObjectControllers[type];
}

export async function createAstralObjects(mapContent, desiredCoordinates) {
    const filledCoordinates = parseMapContent(mapContent);
    const requests = [];
  
    desiredCoordinates.forEach(({ row, column, type, additionalInfo }) => {
      const isFilled = filledCoordinates.some((filledCoord) =>
        filledCoord.row === row && filledCoord.column === column && filledCoord.type === type
      );
  
      if (!isFilled) {
        const controller = getControllerByType(type);
        let createFunction = () => controller.create(row, column, additionalInfo);
        requests.push(createFunction);
      }
    });
  
    try {
      await processRequestsSequentially(requests, 1000); // Adjust the delay as needed
      console.log("Successfully created astral objects.");
    } catch (error) {
      console.error("Error creating astral objects:", error);
    }
}

export async function clearAstralObjects(mapContent) {
  const filledCoordinates = parseMapContent(mapContent);
  const requests = [];

  filledCoordinates.forEach(({ row, column, type }) => {
    const controller = getControllerByType(type);
    requests.push(() => controller.delete(row, column));
  });

  try {
    await processRequestsSequentially(requests, 1000);
    console.log("Successfully cleared astral objects.");
  } catch (error) {
    console.error("Error clearing astral objects:", error);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to process requests with a delay to avoid hitting the rate limit
const processRequestsSequentially = async (requests, delayTime) => {
  for (let request of requests) {
    await request();
    await delay(delayTime); // Wait for delayTime milliseconds between requests
  }
};

// Function to parse the map content and return a set of coordinates that are already filled
function parseMapContent(mapContent) {
  const filledCoordinates = [];

  mapContent.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== null) {
        filledCoordinates.push({
          row: rowIndex,
          column: colIndex,
          type: cell.type,
        });
      }
    });
  });

  return filledCoordinates;
}

// async function clearMapIfNot(mapContent) {
//   const objectsPresent = mapContent.some((row) =>
//     row.some((cell) => cell !== null)
//   );
//   if (objectsPresent) {
//     console.log("Clearing map before creation, this may take a minute...");
//     await clearAstralObjects(mapContent, []);
//   }
// }

export async function createXShape(type = 0, size = 7, additionalInfo = {}) {
  const mapContent = await fetchMapState();

  // We will fix this for an 11 X 11 map for now
  const mapSize = 11;
  const desiredCoordinates = [];
  let startRow, startCol;

  const halfMapSize = Math.floor(mapSize / 2);
  const halfXSize = Math.floor(size / 2);
  startRow = halfMapSize - halfXSize;
  startCol = halfMapSize - halfXSize;

  // Generate coordinates for the "X"
  for (let i = 0; i < size; i++) {
    desiredCoordinates.push({ row: startRow + i, column: startCol + i, type, additionalInfo });
    desiredCoordinates.push({
      row: startRow + size - 1 - i,
      column: startCol + i,
      type,
      additionalInfo
    });
  }
  console.log("Creating shape, this may take a minute...")
  await createAstralObjects(mapContent.map.content, desiredCoordinates);
}

export async function generateMapFromGoalData() {
    const goal = await getLogoCordinates()
    const desiredCoordinates = [];

    goal.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell !== 'SPACE') {
                const { type, additionalInfo } = parseCellTypeAndInfo(cell);
                if (type !== undefined) { 
                    desiredCoordinates.push({ row: rowIndex, column: columnIndex, type, additionalInfo });
                }
            }
        });
    });

    const mapContent = await fetchMapState(); 
    console.log("Generating Crossmint logo. Please be patient, this will take some time...")
    await createAstralObjects(mapContent.map.content, desiredCoordinates);
}

function parseCellTypeAndInfo(cell) {
    let type, additionalInfo = {};
    if (cell.includes('POLYANET')) {
        type = 0; 
    } else if (cell.includes('COMETH')) {
        type = 1;
        additionalInfo.direction = cell.split('_')[0].toLowerCase();
    } else if (cell.includes('SOLOON')) {
        type = 2; 
        additionalInfo.color = cell.split('_')[0].toLowerCase();
    }
    return { type, additionalInfo };
}
