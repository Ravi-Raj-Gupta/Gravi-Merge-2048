import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import DaedalusGrid from "./DaedalusGrid";
import DaedalusHUD from "./DaedalusHUD";
import {
   initializeGrid,
   createStone,
   GRID_HEIGHT,
   GRID_WIDTH,
   calculateLivingTally,
   isGridFull,
   MERGE_THRESHOLD,
   STONE_TYPES,
   EMISSARY_TYPES,
} from "../utils/daedalusGameUtils";
import { applyForge, dropStones, gridChanged } from "../utils/forgeLogic";
import {
   applyJudgment,
   applyHermes,
   applyHephaestus,
   applyAres,
   applyNyx,
} from "../utils/judgmentLogic";
import {
   getLandingRow,
   placeFallingStone,
   moveFallingStoneLeft,
   moveFallingStoneRight,
} from "../utils/fallingStoneLogic";

const DaedalusGame = () => {
   // Game state
   const [grid, setGrid] = useState(initializeGrid);
   const [treasury, setTreasury] = useState(0);
   const [livingTally, setLivingTally] = useState(0);
   const [currentStone, setCurrentStone] = useState(null);
   const [nextStone, setNextStone] = useState(createStone);
   const [reserve, setReserve] = useState(null);
   const [gameOver, setGameOver] = useState(false);
   const [animatingChain, setAnimatingChain] = useState(false);

   // Audio ref
   const audioContextRef = useRef(null);

   // Initialize audio
   useEffect(() => {
      if (!audioContextRef.current) {
         audioContextRef.current = new (
            window.AudioContext || window.webkitAudioContext
         )();
      }
   }, []);

   // Play sound effect
   const playSound = useCallback((frequency, duration = 100) => {
      if (!audioContextRef.current) return;
      try {
         const ctx = audioContextRef.current;
         const osc = ctx.createOscillator();
         const gain = ctx.createGain();

         osc.connect(gain);
         gain.connect(ctx.destination);
         osc.frequency.value = frequency;
         osc.type = "sine";

         gain.gain.setValueAtTime(0.2, ctx.currentTime);
         gain.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + duration / 1000,
         );

         osc.start(ctx.currentTime);
         osc.stop(ctx.currentTime + duration / 1000);
      } catch (e) {
         // Audio error - continue silently
      }
   }, []);

   // Spawn new falling stone
   const spawnNewStone = useCallback(() => {
      if (isGridFull(grid)) {
         setGameOver(true);
         playSound(200, 300);
         return;
      }

      const newStone = nextStone || createStone();
      setCurrentStone({
         ...newStone,
         column: Math.floor(GRID_WIDTH / 2),
      });
      setNextStone(createStone());
   }, [grid, nextStone, playSound]);

   // Initialize game
   useEffect(() => {
      spawnNewStone();
   }, []);

   // Handle chain reaction (Forge → Judgment → Forge...)
   const processChainReaction = useCallback(
      async (startGrid) => {
         setAnimatingChain(true);
         let currentGrid = startGrid;
         let totalTreasuryScore = 0;

         let continueChain = true;
         while (continueChain) {
            // Apply Forge
            const forgeResult = applyForge(currentGrid);
            currentGrid = dropStones(forgeResult.grid);

            // Apply Judgment
            const judgmentResult = applyJudgment(currentGrid);
            const scoreFromJudgment = judgmentResult.score;
            totalTreasuryScore += scoreFromJudgment;
            currentGrid = dropStones(judgmentResult.grid);

            // Check if anything changed
            continueChain =
               forgeResult.forgeOccurred || judgmentResult.judgmentOccurred;

            // Wait for animation
            if (continueChain) {
               await new Promise((resolve) => setTimeout(resolve, 300));
            }
         }

         setGrid(currentGrid);
         setTreasury((prev) => prev + totalTreasuryScore);
         setLivingTally(calculateLivingTally(currentGrid));
         setAnimatingChain(false);

         if (treasury + totalTreasuryScore >= MERGE_THRESHOLD) {
            setGameOver(true);
            playSound(800, 500);
         }
      },
      [treasury, playSound],
   );

   // Handle stone landing
   const handleStonePlace = useCallback(async () => {
      if (!currentStone) return;

      playSound(400, 100);

      // Place stone on grid
      let newGrid = placeFallingStone(grid, currentStone);

      // Handle emissaries
      if (currentStone.type === STONE_TYPES.EMISSARY) {
         const landingRow = getLandingRow(grid, currentStone.column);
         const emissaryType = currentStone.emissaryType;

         if (emissaryType === EMISSARY_TYPES.HERMES) {
            newGrid = applyHermes(newGrid, landingRow, currentStone.column);
            playSound(300, 150);
         } else if (emissaryType === EMISSARY_TYPES.HEPHAESTUS) {
            newGrid = applyHephaestus(newGrid, landingRow, currentStone.column);
            playSound(600, 150);
         } else if (emissaryType === EMISSARY_TYPES.ARES) {
            const result = applyAres(newGrid, landingRow);
            newGrid = result.grid;
            setTreasury((prev) => prev + result.score);
            playSound(700, 200);
         } else if (emissaryType === EMISSARY_TYPES.NYX) {
            const result = applyNyx(newGrid);
            newGrid = result.grid;
            setTreasury((prev) => prev + result.scoreToTreasury);
            playSound(200, 400);
         }

         // After emissary handling, apply forge/judgment
         await processChainReaction(newGrid);
      } else {
         // Normal stone - just apply forge/judgment chain
         await processChainReaction(newGrid);
      }

      // Spawn next stone
      setCurrentStone(null);
      setTimeout(() => {
         spawnNewStone();
      }, 200);
   }, [currentStone, grid, playSound, processChainReaction, spawnNewStone]);

   // Keyboard controls
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (gameOver || animatingChain || !currentStone) return;

         switch (e.key) {
            case "ArrowLeft":
            case "a":
            case "A":
               e.preventDefault();
               setCurrentStone((prev) => moveFallingStoneLeft(prev));
               playSound(300, 50);
               break;

            case "ArrowRight":
            case "d":
            case "D":
               e.preventDefault();
               setCurrentStone((prev) => moveFallingStoneRight(prev));
               playSound(300, 50);
               break;

            case "ArrowDown":
            case "s":
            case "S":
               e.preventDefault();
               handleStonePlace();
               break;

            case " ":
               e.preventDefault();
               handleStonePlace();
               break;

            case "Enter":
               e.preventDefault();
               // Invoke reserve
               if (reserve) {
                  const temp = currentStone;
                  setCurrentStone(reserve);
                  setReserve(temp);
               } else if (currentStone) {
                  setReserve(currentStone);
                  setCurrentStone(nextStone);
                  setNextStone(createStone());
               }
               break;

            default:
               break;
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [
      currentStone,
      reserve,
      gameOver,
      animatingChain,
      handleStonePlace,
      playSound,
   ]);

   // Auto-drop stone every 2 seconds
   useEffect(() => {
      if (gameOver || !currentStone) return;

      const interval = setInterval(() => {
         handleStonePlace();
      }, 2000);

      return () => clearInterval(interval);
   }, [currentStone, gameOver, handleStonePlace]);

   const handleRestart = () => {
      setGrid(initializeGrid());
      setTreasury(0);
      setLivingTally(0);
      setCurrentStone(null);
      setNextStone(createStone());
      setReserve(null);
      setGameOver(false);
      setAnimatingChain(false);
   };

   return (
      <div className="min-h-screen p-2 md:p-4 flex items-center justify-center">
         <div className="w-full max-w-6xl">
            <DaedalusHUD
               treasury={treasury}
               livingTally={livingTally}
               nextStone={nextStone}
               reserve={reserve}
               gameOver={gameOver}
               onRestart={handleRestart}
            />

            <motion.div
               className="mt-3 flex justify-center"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
            >
               <DaedalusGrid grid={grid} currentStone={currentStone} />
            </motion.div>
         </div>
      </div>
   );
};

export default DaedalusGame;
