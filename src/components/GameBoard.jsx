import React from "react";
import { motion } from "framer-motion";
import Tile from "./Tile";

const GameBoard = ({
   grid,
   mergedPositions,
   newTilePosition,
   theme = "modern",
}) => {
   const isMergedAt = (row, col) => {
      return mergedPositions.some((pos) => pos.row === row && pos.col === col);
   };

   const isNew = (row, col) => {
      return (
         newTilePosition &&
         newTilePosition.row === row &&
         newTilePosition.col === col
      );
   };

   return (
      <div
         className={`p-4 rounded-lg ${theme === "neon" ? "bg-black/80 border-2 border-cyan-400" : "bg-gray-200 dark:bg-gray-700"} shadow-2xl`}
      >
         <div
            className="grid gap-2"
            style={{
               gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
            }}
         >
            {grid.map((row, rowIndex) =>
               row.map((value, colIndex) => (
                  <motion.div
                     key={`${rowIndex}-${colIndex}`}
                     className="aspect-square"
                     layout
                     layoutId={`tile-${rowIndex}-${colIndex}`}
                     transition={{
                        layout: { duration: 0.2 },
                     }}
                  >
                     <Tile
                        value={value}
                        isMerged={isMergedAt(rowIndex, colIndex)}
                        isNew={isNew(rowIndex, colIndex)}
                        theme={theme}
                     />
                  </motion.div>
               )),
            )}
         </div>
      </div>
   );
};

export default GameBoard;
