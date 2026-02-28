// Game initialization and helper utilities
export const GRID_SIZE = 4;
export const TARGET_VALUE = 2048;

// Initialize empty grid
export const initializeGrid = (size = GRID_SIZE) => {
   const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

   // Add obstacles in a maze-like pattern
   const obstacles = [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 3 },
      { row: 3, col: 1 },
   ];

   obstacles.forEach(({ row, col }) => {
      if (row < size && col < size) {
         grid[row][col] = -1; // -1 represents obstacle
      }
   });

   return grid;
};

// Add a new tile (2 or 4) to a random empty cell
export const addNewTile = (grid) => {
   const newGrid = grid.map((row) => [...row]);
   const emptyCells = [];

   for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
         if (newGrid[row][col] === 0) {
            emptyCells.push({ row, col });
         }
      }
   }

   if (emptyCells.length === 0) return newGrid;

   const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
   const newValue = Math.random() < 0.9 ? 2 : 4;

   newGrid[randomCell.row][randomCell.col] = newValue;
   return newGrid;
};

// Get all empty cells
export const getEmptyCells = (grid) => {
   const emptyCells = [];
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         if (grid[row][col] === 0) {
            emptyCells.push({ row, col });
         }
      }
   }
   return emptyCells;
};

// Check if value is an obstacle
export const isObstacle = (value) => value === -1;

// Check if value is empty
export const isEmpty = (value) => value === 0;

// Get tile color based on value
export const getTileColor = (value) => {
   const colors = {
      2: "bg-amber-100 text-gray-800",
      4: "bg-amber-200 text-gray-800",
      8: "bg-orange-400 text-white",
      16: "bg-orange-500 text-white",
      32: "bg-red-500 text-white",
      64: "bg-red-600 text-white",
      128: "bg-yellow-400 text-gray-900 font-bold",
      256: "bg-yellow-500 text-gray-900 font-bold",
      512: "bg-yellow-600 text-white font-bold",
      1024: "bg-purple-500 text-white font-bold",
      2048: "bg-green-500 text-white font-bold",
   };

   return colors[value] || "bg-purple-600 text-white font-bold";
};

// Get neon color variant
export const getTileColorNeon = (value) => {
   const colors = {
      2: "bg-cyan-900/60 text-cyan-300 border border-cyan-300",
      4: "bg-cyan-800/60 text-cyan-200 border border-cyan-300",
      8: "bg-blue-800/60 text-blue-300 border border-blue-400",
      16: "bg-purple-800/60 text-purple-300 border border-purple-400",
      32: "bg-pink-800/60 text-pink-300 border border-pink-400",
      64: "bg-red-800/60 text-red-300 border border-red-400",
      128: "bg-orange-800/60 text-orange-300 border border-orange-400 font-bold",
      256: "bg-yellow-800/60 text-yellow-300 border border-yellow-400 font-bold",
      512: "bg-lime-800/60 text-lime-300 border border-lime-400 font-bold",
      1024: "bg-green-800/60 text-green-300 border border-green-400 font-bold",
      2048: "bg-emerald-600/80 text-emerald-200 border border-emerald-400 font-bold shadow-lg shadow-emerald-500",
   };

   return (
      colors[value] ||
      "bg-violet-600/80 text-violet-200 font-bold border border-violet-400"
   );
};
