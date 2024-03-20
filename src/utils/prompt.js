import readline from "readline";
import { clearAstralObjects, createXShape } from "./helpers.js";
import { displayMapContent, fetchMapState } from "./mapUtils.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchAndUpdateMap() {
  const mapData = await fetchMapState();
  displayMapContent(mapData);
  return mapData;
}

async function mainPrompt() {
  const mapData = await fetchAndUpdateMap();
  rl.question(
    "Choose an action: (1) Clear map, (2) Create Astral Object: ",
    async (option) => {
      switch (option) {
        case "1":
          console.log("Clearing map. This may take a minute...");
          await clearAstralObjects(mapData.map.content, []);
          mainPrompt();
          break;
        case "2":
          selectAstralObjectType();
          break;
        default:
          console.log("Invalid option, please select again.");
          mainPrompt();
      }
    }
  );
}

function selectAstralObjectType() {
  rl.question(
    "Select Astral Object Type: (0) Polyanet, (1) Cometh, (2) Soloon: ",
    (typeOption) => {
      if (!["0", "1", "2"].includes(typeOption)) {
        console.log("Invalid type, please select again.");
        selectAstralObjectType();
      } else {
        if (typeOption === "1" || typeOption === "2") {
          getAdditionalInfo(typeOption);
        } else {
          getShapeDimensions(typeOption);
        }
      }
    }
  );
}

function getAdditionalInfo(typeOption) {
  if (typeOption === "1") {
    // Comeths
    rl.question(
      "Enter direction for Cometh (up, down, left, right): ",
      (direction) => {
        if (!["up", "down", "left", "right"].includes(direction)) {
          console.log("Invalid direction, please select again.");
          getAdditionalInfo(typeOption);
        } else {
          getShapeDimensions(typeOption, { direction });
        }
      }
    );
  } else if (typeOption === "2") {
    // Soloons
    rl.question(
      "Enter color for Soloon (blue, red, purple, white): ",
      (color) => {
        if (!["blue", "red", "purple", "white"].includes(color)) {
          console.log("Invalid color, please select again.");
          getAdditionalInfo(typeOption);
        } else {
          getShapeDimensions(typeOption, { color });
        }
      }
    );
  }
}

function getShapeDimensions(typeOption, additionalInfo = {}) {
  rl.question(
    `Enter space of the object: 
Note: This refers to both the length and width of the object.
It must be at least 3 units and has a maximum of 11 units. 
    `,
    async (space) => {
      const size = parseInt(space, 10);
      // Validate the size
      if (isNaN(size) || size < 3 || size > 11) {
        console.log("Invalid size, please enter a number between 3 and 11.");
        getShapeDimensions(typeOption, additionalInfo); // Re-prompt if invalid input
        return;
      }

      console.log(
        `Creating an X shape with type ${typeOption}, space ${size}, additional info: ${JSON.stringify(additionalInfo)}`
      );

      await createXShape(typeOption, size, additionalInfo);
      mainPrompt();
    }
  );
}

export { mainPrompt };
