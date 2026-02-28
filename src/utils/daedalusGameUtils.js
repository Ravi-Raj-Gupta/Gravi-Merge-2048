// Daedalus Codex Game Constants and Utils
export const GRID_WIDTH = 6;
export const GRID_HEIGHT = 10;
export const SPAWN_VALUES = [2, 4, 8, 16];
export const EMISSARY_CHANCE = 0.05; // 1 in 20
export const MERGE_THRESHOLD = 512; // Treasury win condition

// Stone types
export const STONE_TYPES = {
   NORMAL: "normal",
   EMISSARY: "emissary",
};

// Emissary types
export const EMISSARY_TYPES = {
   HERMES: "hermes", // ⊗ - Destroys stone below
   HEPHAESTUS: "hephaestus", // ×2 - Doubles stone below
   ARES: "ares", // ⋆ - Eliminates row
   NYX: "nyx", // • - Clear entire floor
};

export const EMISSARY_SYMBOLS = {
   [EMISSARY_TYPES.HERMES]: "⊗",
   [EMISSARY_TYPES.HEPHAESTUS]: "×2",
   [EMISSARY_TYPES.ARES]: "⋆",
   [EMISSARY_TYPES.NYX]: "•",
};

// Initialize empty grid (0 = empty, null = cell data object)
export const initializeGrid = () => {
   return Array(GRID_HEIGHT)
      .fill(null)
      .map(() =>
         Array(GRID_WIDTH)
            .fill(null)
            .map(() => null),
      );
};

// Create a new stone
export const createStone = () => {
   if (Math.random() < EMISSARY_CHANCE) {
      const emissaryTypes = Object.values(EMISSARY_TYPES);
      const type =
         emissaryTypes[Math.floor(Math.random() * emissaryTypes.length)];
      return {
         type: STONE_TYPES.EMISSARY,
         value: null,
         emissaryType: type,
         id: Math.random(),
      };
   } else {
      return {
         type: STONE_TYPES.NORMAL,
         value: SPAWN_VALUES[Math.floor(Math.random() * SPAWN_VALUES.length)],
         emissaryType: null,
         id: Math.random(),
      };
   }
};

// Get tile color based on value
export const getTileColor = (value) => {
   const colors = {
      2: "bg-amber-100 text-gray-900",
      4: "bg-amber-200 text-gray-900",
      8: "bg-orange-400 text-white",
      16: "bg-orange-500 text-white",
      32: "bg-red-500 text-white",
      64: "bg-red-600 text-white",
      128: "bg-yellow-400 text-gray-900 font-bold",
      256: "bg-yellow-500 text-gray-900 font-bold",
      512: "bg-yellow-600 text-white font-bold",
      1024: "bg-purple-500 text-white font-bold",
      2048: "bg-green-500 text-white font-bold",
      4096: "bg-green-600 text-white font-bold",
      8192: "bg-blue-600 text-white font-bold",
      16384: "bg-indigo-600 text-white font-bold",
      32768: "bg-violet-600 text-white font-bold",
   };
   return colors[value] || "bg-purple-700 text-white font-bold";
};

// Get emissary color
export const getEmissaryColor = (type) => {
   const colors = {
      [EMISSARY_TYPES.HERMES]: "bg-red-500 text-white border-2 border-red-300",
      [EMISSARY_TYPES.HEPHAESTUS]:
         "bg-orange-500 text-white border-2 border-orange-300",
      [EMISSARY_TYPES.ARES]: "bg-blue-500 text-white border-2 border-blue-300",
      [EMISSARY_TYPES.NYX]: "bg-black text-white border-2 border-purple-400",
   };
   return colors[type] || "bg-gray-500 text-white";
};

// Calculate stone value sum (Living Tally)
export const calculateLivingTally = (grid) => {
   let sum = 0;
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         const cell = grid[row][col];
         if (cell && cell.type === STONE_TYPES.NORMAL && cell.value) {
            sum += cell.value;
         }
      }
   }
   return sum;
};

// Check if column is full (cannot spawn new stone)
export const isColumnFull = (grid, col) => {
   return grid[0][col] !== null;
};

// Check if any column is full
export const isGridFull = (grid) => {
   for (let col = 0; col < GRID_WIDTH; col++) {
      if (isColumnFull(grid, col)) {
         return true;
      }
   }
   return false;
};
