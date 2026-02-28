import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   STONE_TYPES,
   getTileColor,
   getEmissaryColor,
   EMISSARY_SYMBOLS,
   MERGE_THRESHOLD,
} from "../utils/daedalusGameUtils";

const StonePreview = ({ stone, label }) => {
   if (!stone) return null;

   return (
      <div className="bg-slate-800 p-1 rounded-lg border border-cyan-400">
         <div className="text-cyan-300 text-xs font-bold mb-0.5">{label}</div>
         <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg font-bold text-base">
            {stone.type === STONE_TYPES.EMISSARY ? (
               <div
                  className={`w-full h-full rounded-lg flex items-center justify-center ${getEmissaryColor(stone.emissaryType)}`}
               >
                  {EMISSARY_SYMBOLS[stone.emissaryType]}
               </div>
            ) : (
               <div
                  className={`w-full h-full rounded-lg flex items-center justify-center ${getTileColor(stone.value)}`}
               >
                  {stone.value}
               </div>
            )}
         </div>
      </div>
   );
};

const DaedalusHUD = ({
   treasury,
   livingTally,
   nextStone,
   reserve,
   gameOver,
   onRestart,
}) => {
   const finalScore = treasury + livingTally;
   const won = treasury >= MERGE_THRESHOLD;

   return (
      <div>
         {/* Main HUD */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-3 md:p-4 rounded-lg border-2 border-cyan-400 shadow-2xl mb-4"
         >
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-2 font-mono">
               ⚔️ DAEDALUS ⚔️
            </h1>

            {/* Summary Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
               {/* Treasury */}
               <motion.div
                  className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-2 rounded-lg border-2 border-emerald-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
               >
                  <div className="text-emerald-300 text-xs font-bold uppercase tracking-wide mb-0.5">
                     Treasury
                  </div>
                  <motion.div
                     className="text-2xl md:text-3xl font-bold text-emerald-100 font-mono"
                     key={treasury}
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 0.3 }}
                  >
                     {treasury}
                  </motion.div>
                  <div className="text-emerald-400 text-xs mt-0.5">Banked</div>
               </motion.div>

               {/* Living Tally */}
               <motion.div
                  className="bg-gradient-to-br from-amber-900 to-amber-800 p-2 rounded-lg border-2 border-amber-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
               >
                  <div className="text-amber-300 text-xs font-bold uppercase tracking-wide mb-0.5">
                     Burden
                  </div>
                  <motion.div
                     className="text-2xl md:text-3xl font-bold text-amber-100 font-mono"
                     key={livingTally}
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 0.3 }}
                  >
                     {livingTally}
                  </motion.div>
                  <div className="text-amber-400 text-xs mt-0.5">Current</div>
               </motion.div>

               {/* Final Score */}
               <motion.div
                  className="bg-gradient-to-br from-purple-900 to-purple-800 p-2 rounded-lg border-2 border-purple-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
               >
                  <div className="text-purple-300 text-xs font-bold uppercase tracking-wide mb-0.5">
                     Final
                  </div>
                  <motion.div
                     className="text-2xl md:text-3xl font-bold text-purple-100 font-mono"
                     key={finalScore}
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 0.3 }}
                  >
                     {finalScore}
                  </motion.div>
                  <div className="text-purple-400 text-xs mt-0.5">Total</div>
               </motion.div>

               {/* Win Condition */}
               <motion.div
                  className={`bg-gradient-to-br ${
                     won
                        ? "from-yellow-800 to-yellow-700 border-yellow-500"
                        : "from-gray-800 to-gray-700 border-gray-500"
                  } p-2 rounded-lg border-2 shadow-lg`}
                  animate={{ scale: won ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: won ? Infinity : 0 }}
               >
                  <div
                     className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${won ? "text-yellow-300" : "text-gray-400"}`}
                  >
                     Target: {MERGE_THRESHOLD}
                  </div>
                  <div
                     className={`text-sm font-bold font-mono ${won ? "text-yellow-100" : "text-gray-400"}`}
                  >
                     {won ? "🏆 REACHED!" : `${treasury}/${MERGE_THRESHOLD}`}
                  </div>
                  <div
                     className={`text-xs mt-0.5 ${won ? "text-yellow-400" : "text-gray-500"}`}
                  >
                     {won ? "Victory!" : "In Progress"}
                  </div>
               </motion.div>
            </div>

            {/* Controls Info */}
            <div className="bg-slate-900/50 p-2 rounded-lg border border-cyan-400/30 text-cyan-300 text-center text-xs font-mono">
               <div className="mb-1">
                  <span className="text-cyan-400">← →</span> Move |{" "}
                  <span className="text-cyan-400">↓</span> Drop |
                  <span className="text-cyan-400">Space</span> Hard |{" "}
                  <span className="text-cyan-400">Enter</span> Reserve
               </div>
            </div>
         </motion.div>

         {/* Next Stone and Reserve */}
         <div className="grid grid-cols-2 gap-1 mb-1">
            <StonePreview stone={nextStone} label="Herald's Preview" />
            <StonePreview stone={reserve} label="Reserve Emissary" />
         </div>

         {/* Game Over Modal */}
         <AnimatePresence>
            {gameOver && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
               >
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="bg-gradient-to-br from-slate-900 to-black border-3 border-cyan-400 rounded-2xl p-4 max-w-md w-full mx-4 text-center shadow-2xl"
                  >
                     {won ? (
                        <>
                           <motion.div
                              className="text-5xl mb-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                           >
                              🏆
                           </motion.div>
                           <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                              VICTORY!
                           </h2>
                           <p className="text-cyan-300 text-base mb-3">
                              The Oracle has sung! You've reached the Treasury
                              of {MERGE_THRESHOLD}!
                           </p>
                        </>
                     ) : (
                        <>
                           <motion.div
                              className="text-5xl mb-2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                           >
                              💀
                           </motion.div>
                           <h2 className="text-3xl font-bold text-red-400 mb-2">
                              FLOOR FULL
                           </h2>
                           <p className="text-cyan-300 text-base mb-3">
                              The workshop is complete. Your stones rest upon
                              the foundation.
                           </p>
                        </>
                     )}

                     {/* Final Stats */}
                     <div className="bg-slate-800/60 p-3 rounded-lg border border-cyan-400 mb-3">
                        <div className="grid grid-cols-2 gap-2">
                           <div>
                              <div className="text-emerald-300 text-xs font-bold mb-0.5">
                                 Treasury
                              </div>
                              <div className="text-xl font-bold text-emerald-100">
                                 {treasury}
                              </div>
                           </div>
                           <div>
                              <div className="text-amber-300 text-xs font-bold mb-0.5">
                                 Burden
                              </div>
                              <div className="text-xl font-bold text-amber-100">
                                 {livingTally}
                              </div>
                           </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-cyan-400">
                           <div className="text-purple-300 text-xs font-bold mb-0.5">
                              Final Reckoning
                           </div>
                           <div className="text-2xl font-bold text-purple-100">
                              {finalScore}
                           </div>
                        </div>
                     </div>

                     <motion.button
                        onClick={onRestart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold text-base rounded-lg shadow-lg"
                     >
                        🔄 New Trial
                     </motion.button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default DaedalusHUD;
