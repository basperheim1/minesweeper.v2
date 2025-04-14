"use client";

import React from "react";
import "@fontsource/press-start-2p";
import styles from "../styles/BoardHeader.module.css";

import { BoardHeaderProps } from "@/types/types";

const formatDisplay = (val: number) =>
  String(Math.max(0, Math.min(999, Math.floor(val)))).padStart(3, "0");

const BoardHeader: React.FC<BoardHeaderProps> = ({
  undeterminedMines,
  time,
  gameOver,
  lost,
  onReset,
}) => {
  let emoji: React.ReactNode = "";

  if (!gameOver) {
    emoji = <img src="/smiley.png" alt="flag" className={styles.emojiIcon} />;
  } else {
    if (lost) {
      emoji = <img src="/loser.png" alt="flag" className={styles.emojiIcon} />;
    } else {
      emoji = <img src="/winner.png" alt="flag" className={styles.emojiIcon} />;
    }
  }

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-[#C0C0C0] border-[2px] border-[#7B7B7B] rounded-sm shadow-inner max-w-100% mx-auto mb-4">
      {/* Mine Counter */}
      <div className="w-[55px] h-[35px] bg-black text-[#FF0000] font-['Press_Start_2P'] text-[0.9rem] flex items-center justify-center leading-none">
        {formatDisplay(undeterminedMines)}
      </div>

      {/* Smiley Button */}
      <button
        onClick={onReset}
        className="cursor-pointer w-10 h-10 bg-[#C0C0C0] border-[3px] border-[#7B7B7B] flex items-center justify-center text-xl shadow-sm hover:brightness-110 active:translate-y-[1px]"
      >
        {emoji}
      </button>

      {/* Timer */}
      <div className="w-[55px] h-[35px] bg-black text-[#FF0000] font-['Press_Start_2P'] text-[0.9rem] flex items-center justify-center leading-none">
        {formatDisplay(time)}
      </div>
    </div>
  );
};

export default BoardHeader;
