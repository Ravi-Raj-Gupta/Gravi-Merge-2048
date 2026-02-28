import { isObstacle, isEmpty } from "./gameUtils";

// Compress tiles in a direction (move towards direction, don't merge)
const compressLine = (line, direction) => {
   // Remove zeros but keep obstacles
   const nonZero = line.filter((val) => !isEmpty(val));
   const result = Array(line.length).fill(0);
   let resultIndex = direction === "right" ? line.length - 1 : 0;

   for (let i = 0; i < nonZero.length; i++) {
      result[resultIndex] = nonZero[i];
      if (direction === "right") {
         resultIndex--;
      } else {
         resultIndex++;
      }
   }

   return result;
};

// Merge tiles in a line
const mergeLine = (line, direction) => {
   const compressed = compressLine(line, direction);
   const merged = Array(line.length).fill(0);
   const isMerged = Array(line.length).fill(false); // Track which tiles were merged
   let merges = [];

   if (direction === "right") {
      for (let i = line.length - 1; i > 0; i--) {
         if (
            !isEmpty(compressed[i]) &&
            compressed[i] === compressed[i - 1] &&
            !isMerged[i] &&
            !isMerged[i - 1]
         ) {
            merged[i] = compressed[i] + compressed[i - 1];
            isMerged[i] = true;
            isMerged[i - 1] = true;
            merged[i - 1] = 0;
            merges.push({
               position: i,
               newValue: merged[i],
               oldValue: compressed[i],
            });
            i--; // Skip next iteration
         } else if (!isEmpty(compressed[i])) {
            merged[i] = compressed[i];
         }
      }
   } else {
      for (let i = 0; i < line.length - 1; i++) {
         if (
            !isEmpty(compressed[i]) &&
            compressed[i] === compressed[i + 1] &&
            !isMerged[i] &&
            !isMerged[i + 1]
         ) {
            merged[i] = compressed[i] + compressed[i + 1];
            isMerged[i] = true;
            isMerged[i + 1] = true;
            merged[i + 1] = 0;
            merges.push({
               position: i,
               newValue: merged[i],
               oldValue: compressed[i],
            });
            i++; // Skip next iteration
         } else if (!isEmpty(compressed[i])) {
            merged[i] = compressed[i];
         }
      }
   }

   // Compress again after merging
   return {
      line: compressLine(merged, direction),
      merges,
   };
};

// Move tiles in a specific direction
export const moveInDirection = (grid, direction) => {
   const newGrid = grid.map((row) => [...row]);
   let moved = false;
   let totalScore = 0;
   let mergedPositions = [];

   if (direction === "left" || direction === "right") {
      // Horizontal movement
      for (let row = 0; row < newGrid.length; row++) {
         const oldLine = [...newGrid[row]];
         const { line: newLine, merges } = mergeLine(
            newGrid[row],
            direction === "left" ? "left" : "right",
         );

         newGrid[row] = newLine;

         // Check if moved
         if (JSON.stringify(oldLine) !== JSON.stringify(newLine)) {
            moved = true;
         }

         // Calculate score from merges
         merges.forEach((merge) => {
            totalScore += merge.newValue;
            mergedPositions.push({
               row,
               col: merge.position,
               value: merge.newValue,
            });
         });
      }
   } else {
      // Vertical movement (up or down)
      for (let col = 0; col < newGrid[0].length; col++) {
         const column = newGrid.map((row) => row[col]);
         const oldColumn = [...column];
         const { line: newColumn, merges } = mergeLine(
            column,
            direction === "up" ? "left" : "right",
         );

         for (let row = 0; row < newGrid.length; row++) {
            newGrid[row][col] = newColumn[row];
         }

         // Check if moved
         if (JSON.stringify(oldColumn) !== JSON.stringify(newColumn)) {
            moved = true;
         }

         // Calculate score from merges
         merges.forEach((merge) => {
            totalScore += merge.newValue;
            mergedPositions.push({
               row: merge.position,
               col,
               value: merge.newValue,
            });
         });
      }
   }

   return {
      grid: newGrid,
      moved,
      score: totalScore,
      mergedPositions,
   };
};

// Check if a move is possible in any direction
export const canMove = (grid) => {
   // Check if there are empty cells
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         if (grid[row][col] === 0) {
            return true;
         }
      }
   }

   // Check if any adjacent tiles can merge
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         const current = grid[row][col];

         if (isObstacle(current) || isEmpty(current)) continue;

         // Check right
         if (col < grid[row].length - 1 && grid[row][col + 1] === current) {
            return true;
         }

         // Check down
         if (row < grid.length - 1 && grid[row + 1][col] === current) {
            return true;
         }
      }
   }

   return false;
};
