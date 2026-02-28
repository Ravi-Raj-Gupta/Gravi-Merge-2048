import { STONE_TYPES } from "./daedalusGameUtils";

// Apply Forge Law - vertical merging when equal values stack
export const applyForge = (grid) => {
   const newGrid = grid.map((row) => [...row]);
   let forgeOccurred = false;
   let score = 0; // Points added to treasury

   // Scan from bottom to top, column by column
   for (let col = 0; col < newGrid[0].length; col++) {
      let row = newGrid.length - 1;

      while (row > 0) {
         const currentCell = newGrid[row][col];
         const aboveCell = newGrid[row - 1][col];

         // Check if Forge can fire
         if (
            currentCell &&
            aboveCell &&
            currentCell.type === STONE_TYPES.NORMAL &&
            aboveCell.type === STONE_TYPES.NORMAL &&
            currentCell.value === aboveCell.value
         ) {
            // Forge fires: merge
            const newValue = currentCell.value * 2;
            newGrid[row][col] = {
               type: STONE_TYPES.NORMAL,
               value: newValue,
               emissaryType: null,
               id: Math.random(),
               justMerged: true, // For animation
            };
            newGrid[row - 1][col] = null;
            forgeOccurred = true;

            // DON'T add to score here - only Judgment adds to score
            // Forge law is about structure, not points

            // Continue checking down from this new value
            row--;
         } else {
            row--;
         }
      }
   }

   return {
      grid: newGrid,
      forgeOccurred,
      score,
   };
};

// Drop all stones to fill gaps (after forge or judgment)
export const dropStones = (grid) => {
   const newGrid = grid.map((row) => [...row]);

   for (let col = 0; col < newGrid[0].length; col++) {
      const column = [];

      // Collect non-null stones
      for (let row = 0; row < newGrid.length; row++) {
         if (newGrid[row][col] !== null) {
            column.push(newGrid[row][col]);
         }
      }

      // Clear column
      for (let row = 0; row < newGrid.length; row++) {
         newGrid[row][col] = null;
      }

      // Place stones at bottom
      for (let i = 0; i < column.length; i++) {
         newGrid[newGrid.length - column.length + i][col] = column[i];
      }
   }

   return newGrid;
};

// Check if stones moved during drop
export const gridChanged = (grid1, grid2) => {
   return JSON.stringify(grid1) !== JSON.stringify(grid2);
};
