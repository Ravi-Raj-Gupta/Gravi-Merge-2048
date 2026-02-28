import { isObstacle, isEmpty } from "./gameUtils";

// Apply gravity in a specific direction
export const applyGravity = (grid, direction = "down") => {
   const newGrid = grid.map((row) => [...row]);
   let moved = false;

   if (direction === "down") {
      // Gravity pulls tiles downward
      for (let col = 0; col < newGrid[0].length; col++) {
         // Collect non-zero, non-obstacle tiles from bottom to top
         const tiles = [];
         for (let row = newGrid.length - 1; row >= 0; row--) {
            if (!isEmpty(newGrid[row][col]) && !isObstacle(newGrid[row][col])) {
               tiles.push(newGrid[row][col]);
               newGrid[row][col] = 0;
            }
         }

         // Place tiles from bottom
         let row = newGrid.length - 1;
         for (let i = 0; i < tiles.length; i++) {
            while (
               row >= 0 &&
               (!isEmpty(newGrid[row][col]) || isObstacle(newGrid[row][col]))
            ) {
               row--;
            }
            if (row >= 0) {
               newGrid[row][col] = tiles[i];
               row--;
            }
         }
      }
   } else if (direction === "up") {
      // Gravity pulls tiles upward
      for (let col = 0; col < newGrid[0].length; col++) {
         const tiles = [];
         for (let row = 0; row < newGrid.length; row++) {
            if (!isEmpty(newGrid[row][col]) && !isObstacle(newGrid[row][col])) {
               tiles.push(newGrid[row][col]);
               newGrid[row][col] = 0;
            }
         }

         let row = 0;
         for (let i = 0; i < tiles.length; i++) {
            while (
               row < newGrid.length &&
               (!isEmpty(newGrid[row][col]) || isObstacle(newGrid[row][col]))
            ) {
               row++;
            }
            if (row < newGrid.length) {
               newGrid[row][col] = tiles[i];
               row++;
            }
         }
      }
   } else if (direction === "left") {
      // Gravity pulls tiles leftward
      for (let row = 0; row < newGrid.length; row++) {
         const tiles = [];
         for (let col = 0; col < newGrid[row].length; col++) {
            if (!isEmpty(newGrid[row][col]) && !isObstacle(newGrid[row][col])) {
               tiles.push(newGrid[row][col]);
               newGrid[row][col] = 0;
            }
         }

         let col = 0;
         for (let i = 0; i < tiles.length; i++) {
            while (
               col < newGrid[row].length &&
               (!isEmpty(newGrid[row][col]) || isObstacle(newGrid[row][col]))
            ) {
               col++;
            }
            if (col < newGrid[row].length) {
               newGrid[row][col] = tiles[i];
               col++;
            }
         }
      }
   } else if (direction === "right") {
      // Gravity pulls tiles rightward
      for (let row = 0; row < newGrid.length; row++) {
         const tiles = [];
         for (let col = newGrid[row].length - 1; col >= 0; col--) {
            if (!isEmpty(newGrid[row][col]) && !isObstacle(newGrid[row][col])) {
               tiles.push(newGrid[row][col]);
               newGrid[row][col] = 0;
            }
         }

         let col = newGrid[row].length - 1;
         for (let i = 0; i < tiles.length; i++) {
            while (
               col >= 0 &&
               (!isEmpty(newGrid[row][col]) || isObstacle(newGrid[row][col]))
            ) {
               col--;
            }
            if (col >= 0) {
               newGrid[row][col] = tiles[i];
               col--;
            }
         }
      }
   }

   return newGrid;
};

// Check if grid changed after applying gravity
export const gridChanged = (grid1, grid2) => {
   return JSON.stringify(grid1) !== JSON.stringify(grid2);
};
