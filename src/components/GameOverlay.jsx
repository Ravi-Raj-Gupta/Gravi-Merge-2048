import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GameOverlay = ({
   isVisible,
   status,
   score,
   bestScore,
   onRestart,
   theme,
}) => {
   const isVictory = status === "VICTORY";
   const isGameOver = status === "GAME_OVER";

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
               <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className={`rounded-2xl p-8 max-w-md w-full text-center shadow-2xl ${
                     theme === "neon"
                        ? "bg-gradient-to-br from-purple-900 to-black border-2 border-cyan-400"
                        : "bg-gradient-to-br from-white to-gray-50"
                  }`}
               >
                  {/* Icon */}
                  <motion.div
                     className="text-6xl mb-4"
                     animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                  >
                     {isVictory ? "🏆" : "💥"}
                  </motion.div>

                  {/* Title */}
                  <h2
                     className={`text-3xl font-bold mb-4 ${theme === "neon" ? "text-cyan-300" : "text-gray-800"}`}
                  >
                     {isVictory ? "Victory!" : "Game Over"}
                  </h2>

                  {/* Message */}
                  <p
                     className={`text-lg mb-6 ${theme === "neon" ? "text-cyan-200" : "text-gray-600"}`}
                  >
                     {isVictory
                        ? "You reached 2048! Amazing! 🚀"
                        : "No more moves available. Better luck next time! 💪"}
                  </p>

                  {/* Score Stats */}
                  <div
                     className={`p-4 rounded-lg mb-6 ${theme === "neon" ? "bg-cyan-900/60 border border-cyan-300" : "bg-gray-100"}`}
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span
                           className={
                              theme === "neon"
                                 ? "text-cyan-200"
                                 : "text-gray-600"
                           }
                        >
                           Your Score:
                        </span>
                        <span
                           className={`text-2xl font-bold ${theme === "neon" ? "text-cyan-300" : "text-gray-900"}`}
                        >
                           {score}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span
                           className={
                              theme === "neon"
                                 ? "text-cyan-200"
                                 : "text-gray-600"
                           }
                        >
                           Best Score:
                        </span>
                        <span
                           className={`text-2xl font-bold ${theme === "neon" ? "text-emerald-300" : "text-gray-900"}`}
                        >
                           {bestScore}
                        </span>
                     </div>
                  </div>

                  {/* Restart Button */}
                  <motion.button
                     onClick={onRestart}
                     className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                        theme === "neon"
                           ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black hover:shadow-lg hover:shadow-cyan-500"
                           : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg"
                     }`}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     🔄 Play Again
                  </motion.button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default GameOverlay;
