import {
   GRID_HEIGHT,
   GRID_WIDTH,
   STONE_TYPES,
   EMISSARY_TYPES,
} from "./daedalusGameUtils";

// Get the landing row for a falling stone in a column
export const getLandingRow = (grid, col) => {
   for (let row = 0; row < GRID_HEIGHT; row++) {
      if (grid[row][col] !== null) {
         return row - 1; // Land on top of first stone
      }
   }
   return GRID_HEIGHT - 1; // Land at bottom if column empty
};

// Move falling stone left
export const moveFallingStoneLeft = (fallingStone) => {
   if (fallingStone) {
      return {
         ...fallingStone,
         column: Math.max(0, fallingStone.column - 1),
      };
   }
   return fallingStone;
};

// Move falling stone right
export const moveFallingStoneRight = (fallingStone) => {
   if (fallingStone) {
      return {
         ...fallingStone,
         column: Math.min(GRID_WIDTH - 1, fallingStone.column + 1),
      };
   }
   return fallingStone;
};

// Place falling stone on grid
export const placeFallingStone = (grid, fallingStone) => {
   if (!fallingStone) return grid;

   const newGrid = grid.map((row) => [...row]);
   const landingRow = getLandingRow(newGrid, fallingStone.column);

   if (landingRow >= 0) {
      newGrid[landingRow][fallingStone.column] = {
         type: fallingStone.type,
         value: fallingStone.value,
         emissaryType: fallingStone.emissaryType,
         id: fallingStone.id,
         justLanded: true,
      };
   }

   return newGrid;
};

// Get falling stone animation position (before it's placed)
export const getFallingStonePosition = (fallingStone) => {
   if (!fallingStone) return null;

   return {
      column: fallingStone.column,
      row: 0, // Falls from top
   };
};

// Check if stone can move (check for collision)
export const canMoveStoneTo = (grid, fallingStone, newColumn) => {
   if (newColumn < 0 || newColumn >= GRID_WIDTH) return false;

   return true; // Can always move horizontally before landing
};
