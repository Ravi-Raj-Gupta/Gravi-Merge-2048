import React from "react";
import { motion } from "framer-motion";

const Controls = ({ gravityDirection, moveCount, status, theme }) => {
   const directions = [
      { key: "up", arrow: "⬆️", label: "UP" },
      { key: "down", arrow: "⬇️", label: "DOWN" },
      { key: "left", arrow: "⬅️", label: "LEFT" },
      { key: "right", arrow: "➡️", label: "RIGHT" },
   ];

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.3 }}
         className={`mt-8 p-6 rounded-lg ${
            theme === "neon"
               ? "bg-gradient-to-b from-purple-900/60 to-black border border-purple-400"
               : "bg-white dark:bg-gray-800 shadow-lg"
         }`}
      >
         <div className="max-w-4xl mx-auto">
            {/* Status */}
            <div className="mb-6 p-4 rounded-lg text-center">
               <div
                  className={`text-lg font-semibold mb-2 ${theme === "neon" ? "text-purple-300" : "text-gray-700 dark:text-gray-300"}`}
               >
                  Game Status
               </div>
               <div
                  className={`text-2xl font-bold ${
                     status === "PLAYING"
                        ? theme === "neon"
                           ? "text-cyan-400"
                           : "text-green-600"
                        : status === "VICTORY"
                          ? "text-yellow-500"
                          : "text-red-500"
                  }`}
               >
                  {status === "PLAYING"
                     ? "▶️ Playing"
                     : status === "VICTORY"
                       ? "🏆 Victory!"
                       : "💀 Game Over"}
               </div>
            </div>

            {/* Move Counter */}
            <div className="mb-6 p-4 rounded-lg text-center bg-blue-500/20 dark:bg-blue-500/20">
               <div
                  className={`text-sm ${theme === "neon" ? "text-cyan-200" : "text-gray-600 dark:text-gray-400"}`}
               >
                  Total Moves
               </div>
               <motion.div
                  className={`text-3xl font-bold ${theme === "neon" ? "text-cyan-300" : "text-blue-600 dark:text-blue-400"}`}
                  key={moveCount}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
               >
                  {moveCount}
               </motion.div>
            </div>

            {/* Gravity Direction Indicator */}
            <div className="mb-6">
               <div
                  className={`text-center text-sm font-semibold mb-4 ${theme === "neon" ? "text-purple-300" : "text-gray-700 dark:text-gray-300"}`}
               >
                  Gravity Direction
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {directions.map((dir) => (
                     <motion.div
                        key={dir.key}
                        className={`p-4 rounded-lg text-center transition-all ${
                           gravityDirection === dir.key
                              ? theme === "neon"
                                 ? "bg-cyan-500/80 border-2 border-cyan-300 shadow-lg shadow-cyan-500"
                                 : "bg-blue-500 text-white border-2 border-blue-600 shadow-lg"
                              : theme === "neon"
                                ? "bg-purple-900/40 border border-purple-400"
                                : "bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                     >
                        <div className="text-3xl mb-2">{dir.arrow}</div>
                        <div
                           className={`text-xs font-semibold ${theme === "neon" ? "text-cyan-200" : "text-gray-600 dark:text-gray-400"}`}
                        >
                           {dir.label}
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Keyboard Instructions */}
            <div
               className={`p-4 rounded-lg text-center text-sm ${theme === "neon" ? "bg-cyan-900/40 border border-cyan-400 text-cyan-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
            >
               💡 Use <span className="font-semibold">Arrow Keys</span> or{" "}
               <span className="font-semibold">WASD</span> to move tiles
            </div>
         </div>
      </motion.div>
   );
};

export default Controls;
