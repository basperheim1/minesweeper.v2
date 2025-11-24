"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Board from "./Board";
import Settings from "./Settings";
import HamburgerMenu from "./HamburgerMenu";
import MinesweeperHeader from "./MinesweeperHeader";
import { SolverHandle } from "../types/types";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Game: React.FC = () => {
  const [restart, setRestart] = useState(0);
  const [rows, setRows] = useState(16);
  const [columns, setColumns] = useState(30);
  const [mines, setMines] = useState(99);

  const [showSettings, setShowSettings] = useState(false);
  const [showProbability, setShowProbability] = useState<boolean>(true);

  const AISolvingRef = useRef<boolean>(false);
  const clickSolve = useRef<SolverHandle | null>(null);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [boardScale, setBoardScale] = useState(1);

  // Scale board so it never overflows horizontally on small screens
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScale = () => {
      if (!boardRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const boardWidth = boardRef.current.scrollWidth;

      if (boardWidth > 0 && containerWidth > 0 && boardWidth > containerWidth) {
        const scale = containerWidth / (boardWidth + 4);
        setBoardScale(scale);
      } else {
        setBoardScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [rows, columns, mines]);

  const applySettings = (
    newRows: number,
    newColumns: number,
    newMines: number
  ) => {
    if (newMines > newRows * newColumns) {
      console.log("Too many mines!");
      return;
    }

    setRows(newRows);
    setColumns(newColumns);
    setMines(newMines);
    setRestart((r) => r + 1);
    setShowSettings(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Hamburger Menu */}
      <div className="fixed top-4 left-4 z-[10000]">
        <HamburgerMenu onClick={() => setShowSettings((prev) => !prev)} />
      </div>

      {/* Sidebar Overlay & Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-20 h-full
             w-[65vw]        /* about half the screen on mobile */
             sm:w-[400px]    /* keep old width on larger screens */
             bg-white dark:bg-zinc-900 shadow-lg p-4 overflow-y-auto pt-10"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Settings
                rows={rows}
                columns={columns}
                mines={mines}
                applySettings={applySettings}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content – this is what actually centers the board */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-6">
        <div
          ref={containerRef}
          className="w-full flex items-center justify-center overflow-hidden"
        >
          <div
            ref={boardRef}
            className="w-max m-6 md:m-10 border-2 border-zinc-300 dark:border-zinc-700 p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900 flex flex-col items-center gap-4"
            style={{
              transform: `scale(${boardScale})`,
              transformOrigin: "center center", // <-- center, not top
            }}
          >
            <Board
              rows={rows}
              columns={columns}
              mineCount={mines}
              restart={restart}
              setRestart={setRestart}
              showProbability={showProbability}
              AISolvingRef={AISolvingRef}
              ref={clickSolve}
            />

            <MinesweeperHeader
              showProbability={showProbability}
              setShowProbability={setShowProbability}
              AISolvingRef={AISolvingRef}
              solverRef={clickSolve}
            />
          </div>
        </div>
      </main>

      {/* Bottom Right Social Links */}
      <div className="fixed bottom-4 right-4 z-[10000] flex flex-col items-center gap-3">
        <a
          href="https://github.com/basperheim1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg shadow transition-colors"
        >
          <FaGithub size={18} />
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ben-asperheim/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg shadow transition-colors"
        >
          <FaLinkedin size={18} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default Game;
