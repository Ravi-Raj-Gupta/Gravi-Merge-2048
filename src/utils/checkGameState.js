import { canMove } from "./moveLogic";
import { TARGET_VALUE } from "./gameUtils";

// Check if player has won (reached 2048)
export const checkWin = (grid) => {
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         if (grid[row][col] === TARGET_VALUE) {
            return true;
         }
      }
   }
   return false;
};

// Check if game is over (no moves possible)
export const checkGameOver = (grid) => {
   return !canMove(grid);
};

// Get game status
export const getGameStatus = (grid, hasWon) => {
   if (hasWon) return "VICTORY";
   if (checkGameOver(grid)) return "GAME_OVER";
   return "PLAYING";
};

// Get all tiles on grid (for tracking)
export const getAllTiles = (grid) => {
   const tiles = [];
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         const value = grid[row][col];
         if (value > 0) {
            tiles.push({
               row,
               col,
               value,
               id: `${row}-${col}`, // Unique identifier for animation
            });
         }
      }
   }
   return tiles;
};
