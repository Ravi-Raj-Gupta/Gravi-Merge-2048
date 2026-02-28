import React from "react";
import { motion } from "framer-motion";
import {
   GRID_WIDTH,
   GRID_HEIGHT,
   getTileColor,
   getEmissaryColor,
   STONE_TYPES,
   EMISSARY_SYMBOLS,
   EMISSARY_TYPES,
} from "../utils/daedalusGameUtils";

const DaedalusCell = ({
   value,
   type,
   emissaryType,
   isCurrentStone,
   isFalling,
}) => {
   if (!value && type === null && !isCurrentStone) {
      return (
         <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-md border border-gray-700 shadow-inner" />
      );
   }

   if (isCurrentStone && isFalling) {
      return (
         <motion.div
            className={`w-full h-full rounded-md font-bold text-xs md:text-sm flex items-center justify-center shadow-2xl border-2 ${
               type === STONE_TYPES.EMISSARY
                  ? getEmissaryColor(emissaryType)
                  : getTileColor(value)
            }`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ type: "spring", stiffness: 100 }}
         >
            {type === STONE_TYPES.EMISSARY
               ? EMISSARY_SYMBOLS[emissaryType]
               : value}
         </motion.div>
      );
   }

   if (type === STONE_TYPES.EMISSARY) {
      return (
         <motion.div
            className={`w-full h-full rounded-md text-sm md:text-base flex items-center justify-center shadow-lg border-2 ${getEmissaryColor(
               emissaryType,
            )}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
         >
            {EMISSARY_SYMBOLS[emissaryType]}
         </motion.div>
      );
   }

   return (
      <motion.div
         className={`w-full h-full rounded-md font-bold text-xs md:text-sm flex items-center justify-center shadow-lg ${getTileColor(value)}`}
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
         {value}
      </motion.div>
   );
};

const DaedalusGrid = ({ grid, currentStone }) => {
   return (
      <div className="inline-block p-1 md:p-2 bg-gradient-to-br from-slate-900 to-black rounded-lg border-2 border-cyan-500 shadow-2xl">
         <div
            className="grid gap-0.5 md:gap-1"
            style={{
               gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
               gridTemplateRows: `repeat(${GRID_HEIGHT}, minmax(0, 1fr))`,
            }}
         >
            {grid.map((row, rowIndex) =>
               row.map((cell, colIndex) => {
                  // Check if current stone is in this column at top
                  const isCurrentStoneHere =
                     currentStone &&
                     colIndex === currentStone.column &&
                     rowIndex === 0;

                  return (
                     <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12"
                     >
                        <DaedalusCell
                           value={cell?.value}
                           type={cell?.type}
                           emissaryType={cell?.emissaryType}
                           isCurrentStone={isCurrentStoneHere}
                           isFalling={isCurrentStoneHere}
                        />
                     </div>
                  );
               }),
            )}
         </div>

         {/* Grid Legend */}
         <div className="mt-2 p-1 bg-slate-800/50 rounded-lg border border-cyan-400/30">
            <div className="text-white text-xs md:text-xs font-mono">
               <div className="mb-0.5">
                  <span className="text-cyan-400">✓</span> 2, 4, 8, 16
               </div>
               <div className="mb-0.5">
                  <span className="text-cyan-400">✓</span> ⊗ ×2 ⋆ •
               </div>
               <div>
                  <span className="text-cyan-400">✓</span> 6×10
               </div>
            </div>
         </div>
      </div>
   );
};

export default DaedalusGrid;
