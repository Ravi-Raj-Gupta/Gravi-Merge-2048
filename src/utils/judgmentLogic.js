import { STONE_TYPES, EMISSARY_TYPES } from "./daedalusGameUtils";
import { dropStones } from "./forgeLogic";

// Apply Judgment Law - find and remove horizontal runs of 3+
export const applyJudgment = (grid) => {
   const newGrid = grid.map((row) => [...row]);
   let judgmentOccurred = false;
   let score = 0;
   const dismissedCells = new Set();

   // Scan from bottom to top (as per spec)
   for (let row = newGrid.length - 1; row >= 0; row--) {
      let col = 0;

      while (col < newGrid[row].length) {
         const cell = newGrid[row][col];

         // Only check normal stones
         if (cell && cell.type === STONE_TYPES.NORMAL) {
            const value = cell.value;
            let runLength = 1;

            // Count consecutive cells with same value
            while (col + runLength < newGrid[row].length) {
               const nextCell = newGrid[row][col + runLength];
               if (
                  nextCell &&
                  nextCell.type === STONE_TYPES.NORMAL &&
                  nextCell.value === value
               ) {
                  runLength++;
               } else {
                  break;
               }
            }

            // If run >= 3, mark for dismissal
            if (runLength >= 3) {
               judgmentOccurred = true;
               for (let i = 0; i < runLength; i++) {
                  const cellKey = `${row}-${col + i}`;
                  dismissedCells.add(cellKey);
                  score += value;
               }
               col += runLength;
            } else {
               col++;
            }
         } else {
            col++;
         }
      }
   }

   // Apply dismissals
   if (judgmentOccurred) {
      for (let row = 0; row < newGrid.length; row++) {
         for (let col = 0; col < newGrid[row].length; col++) {
            const cellKey = `${row}-${col}`;
            if (dismissedCells.has(cellKey)) {
               newGrid[row][col] = null;
            }
         }
      }
   }

   return {
      grid: newGrid,
      judgmentOccurred,
      score,
   };
};

// Handle Hermes emissary - destroys stone below
export const applyHermes = (grid, row, col) => {
   const newGrid = grid.map((row) => [...row]);
   if (row < newGrid.length - 1 && newGrid[row + 1][col]) {
      newGrid[row + 1][col] = null;
   }
   return newGrid;
};

// Handle Hephaestus emissary - doubles stone below
export const applyHephaestus = (grid, row, col) => {
   const newGrid = grid.map((row) => [...row]);
   if (row < newGrid.length - 1) {
      const cellBelow = newGrid[row + 1][col];
      if (cellBelow && cellBelow.type === STONE_TYPES.NORMAL) {
         newGrid[row + 1][col] = {
            ...cellBelow,
            value: cellBelow.value * 2,
            id: Math.random(),
            justDoubled: true,
         };
      }
   }
   return newGrid;
};

// Handle Ares emissary - eliminates entire row
export const applyAres = (grid, row) => {
   const newGrid = grid.map((row) => [...row]);
   let score = 0;

   for (let col = 0; col < newGrid[row].length; col++) {
      const cell = newGrid[row][col];
      if (cell && cell.type === STONE_TYPES.NORMAL) {
         score += cell.value;
      }
      newGrid[row][col] = null;
   }

   return { grid: newGrid, score };
};

// Handle Nyx emissary - clears entire floor
export const applyNyx = (grid) => {
   let totalValue = 0;

   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         const cell = grid[row][col];
         if (cell && cell.type === STONE_TYPES.NORMAL) {
            totalValue += cell.value;
         }
      }
   }

   const newGrid = grid.map((row) => [...row].map(() => null));
   return { grid: newGrid, scoreToTreasury: totalValue };
};
