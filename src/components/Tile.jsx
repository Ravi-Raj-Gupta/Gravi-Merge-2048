import React from "react";
import { motion } from "framer-motion";
import { getTileColor, getTileColorNeon, isObstacle } from "../utils/gameUtils";

const Tile = ({ value, isMerged, isNew, theme = "modern" }) => {
   const isObst = isObstacle(value);

   if (isObst) {
      // Obstacle tile
      return (
         <div className="w-full h-full bg-gray-700 dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-inner">
            <span className="text-2xl">🧱</span>
         </div>
      );
   }

   if (!value) {
      // Empty cell
      return (
         <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm" />
      );
   }

   const colorClass =
      theme === "neon" ? getTileColorNeon(value) : getTileColor(value);

   return (
      <motion.div
         initial={isNew ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
         animate={{
            scale: isMerged ? [1, 1.1, 1] : 1,
            opacity: 1,
         }}
         transition={{
            duration: isMerged ? 0.2 : 0.15,
            type: "spring",
            stiffness: 300,
            damping: 20,
         }}
         className={`w-full h-full rounded-lg ${colorClass} flex items-center justify-center font-bold text-2xl cursor-default shadow-lg hover:shadow-xl transition-shadow duration-200 ${
            theme === "neon" ? "animate-pulse" : ""
         }`}
         style={{
            boxShadow:
               theme === "neon" ? `0 0 20px ${getGlowColor(value)}` : undefined,
         }}
      >
         <span className="pointer-events-none">{value}</span>
      </motion.div>
   );
};

const getGlowColor = (value) => {
   const glows = {
      2: "rgba(34, 197, 194, 0.5)", // cyan
      4: "rgba(59, 130, 246, 0.5)", // blue
      8: "rgba(147, 51, 234, 0.5)", // purple
      16: "rgba(236, 72, 153, 0.5)", // pink
      32: "rgba(239, 68, 68, 0.5)", // red
      64: "rgba(249, 115, 22, 0.5)", // orange
      128: "rgba(234, 179, 8, 0.5)", // yellow
      256: "rgba(34, 197, 94, 0.5)", // green
      512: "rgba(16, 185, 129, 0.5)", // teal
      1024: "rgba(8, 145, 178, 0.5)", // cyan-600
      2048: "rgba(16, 185, 129, 0.8)", // emerald
   };

   return glows[value] || "rgba(139, 92, 246, 0.5)";
};

export default Tile;
