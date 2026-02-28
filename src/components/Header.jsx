import React from "react";
import { motion } from "framer-motion";

const Header = ({
   score,
   bestScore,
   onRestart,
   theme,
   onThemeToggle,
   isSoundOn,
   onSoundToggle,
}) => {
   return (
      <div
         className={`mb-8 p-6 rounded-lg ${theme === "neon" ? "bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-400" : "bg-gradient-to-r from-blue-500 to-purple-600"} shadow-lg`}
      >
         <div className="max-w-4xl mx-auto">
            <motion.h1
               className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
               🚀 Gravi-Merge 2048
            </motion.h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
               {/* Current Score */}
               <motion.div
                  className={`p-4 rounded-lg ${theme === "neon" ? "bg-cyan-900/60 border border-cyan-300" : "bg-white/20"} text-center backdrop-blur`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
               >
                  <div className="text-sm text-white/80 mb-1">Score</div>
                  <motion.div
                     className="text-3xl font-bold text-white"
                     key={score}
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 0.3 }}
                  >
                     {score}
                  </motion.div>
               </motion.div>

               {/* Best Score */}
               <motion.div
                  className={`p-4 rounded-lg ${theme === "neon" ? "bg-purple-900/60 border border-purple-300" : "bg-white/20"} text-center backdrop-blur`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
               >
                  <div className="text-sm text-white/80 mb-1">Best</div>
                  <div className="text-3xl font-bold text-white">
                     {bestScore}
                  </div>
               </motion.div>

               {/* Sound Toggle */}
               <motion.button
                  onClick={onSoundToggle}
                  className={`p-4 rounded-lg ${theme === "neon" ? "bg-pink-900/60 border border-pink-300 hover:border-pink-200" : "bg-white/20 hover:bg-white/30"} text-center backdrop-blur transition-colors duration-200`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
               >
                  <div className="text-sm text-white/80 mb-1">Sound</div>
                  <div className="text-2xl">{isSoundOn ? "🔊" : "🔇"}</div>
               </motion.button>

               {/* Theme Toggle */}
               <motion.button
                  onClick={onThemeToggle}
                  className={`p-4 rounded-lg ${theme === "neon" ? "bg-yellow-900/60 border border-yellow-300 hover:border-yellow-200" : "bg-white/20 hover:bg-white/30"} text-center backdrop-blur transition-colors duration-200`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
               >
                  <div className="text-sm text-white/80 mb-1">Theme</div>
                  <div className="text-2xl">
                     {theme === "neon" ? "✨" : "🎨"}
                  </div>
               </motion.button>
            </div>

            {/* Restart Button */}
            <motion.button
               onClick={onRestart}
               className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                  theme === "neon"
                     ? "bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-500"
                     : "bg-white hover:bg-gray-100 text-blue-600 hover:shadow-lg"
               }`}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
               ⚡ New Game
            </motion.button>
         </div>
      </div>
   );
};

export default Header;
