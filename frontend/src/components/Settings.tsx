"use client";

import { SettingsData } from "@/types/types";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Settings: React.FC<SettingsData> = ({ rows, columns, mines, applySettings }) => {
  // Store raw text inputs as strings for editing freedom
  const [rowInput, setRowInput] = useState(rows.toString());
  const [colInput, setColInput] = useState(columns.toString());
  const [mineInput, setMineInput] = useState(mines.toString());

  // Sync these parsed values with sliders
  const row = parseInt(rowInput);
  const col = parseInt(colInput);
  const mine = parseInt(mineInput);

  const rowsValid = !isNaN(row) && row >= 4 && row <= 24;
  const colsValid = !isNaN(col) && col >= 7 && col <= 30;
  const minesValid = !isNaN(mine) && mine >= 1 && mine <= row * col - 1;

  const anyInvalid = !rowsValid || !colsValid || !minesValid;

  const applyPreset = (preset: "beginner" | "intermediate" | "expert") => {
    switch (preset) {
      case "beginner":
        setRowInput("9");
        setColInput("9");
        setMineInput("10");
        break;
      case "intermediate":
        setRowInput("16");
        setColInput("16");
        setMineInput("40");
        break;
      case "expert":
        setRowInput("16");
        setColInput("30");
        setMineInput("99");
        break;
    }
  };

  const handleBlur = (
    value: string,
    min: number,
    max: number,
    setter: (val: string) => void
  ) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      setter(clamped.toString());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 p-6 rounded-2xl shadow-md bg-white dark:bg-zinc-900 space-y-6">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
        Game Settings
      </h2>

      <div className="flex justify-center gap-4">
        <Button variant="outline" className={"cursor-pointer"} onClick={() => applyPreset("beginner")}>
          Beginner
        </Button>
        <Button variant="outline" className={"cursor-pointer"} onClick={() => applyPreset("intermediate")}>
          Intermediate
        </Button>
        <Button variant="outline" className={"cursor-pointer"} onClick={() => applyPreset("expert")}>
          Expert
        </Button>
      </div>

      {/* Rows */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Rows
        </label>
        <div className="flex items-center gap-4">
          <Slider
            min={4}
            max={24}
            step={1}
            value={[rowsValid ? row : 4]}
            onValueChange={(val) => setRowInput(val[0].toString())}
          />
          <input
            type="text"
            value={rowInput}
            onChange={(e) => setRowInput(e.target.value)}
            onBlur={() => handleBlur(rowInput, 4, 24, setRowInput)}
            className={`w-16 px-2 py-1 border rounded-md text-sm bg-white dark:bg-zinc-800 ${
              rowsValid
                ? "text-zinc-900 dark:text-white"
                : "border-red-500 text-red-600 dark:text-red-400"
            }`}
          />
        </div>
        {!rowsValid && (
          <p className="text-xs text-red-500">Must be between 4 and 24</p>
        )}
      </div>

      {/* Columns */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Columns
        </label>
        <div className="flex items-center gap-4">
          <Slider
            min={7}
            max={30}
            step={1}
            value={[colsValid ? col : 7]}
            onValueChange={(val) => setColInput(val[0].toString())}
          />
          <input
            type="text"
            value={colInput}
            onChange={(e) => setColInput(e.target.value)}
            onBlur={() => handleBlur(colInput, 7, 30, setColInput)}
            className={`w-16 px-2 py-1 border rounded-md text-sm bg-white dark:bg-zinc-800 ${
              colsValid
                ? "text-zinc-900 dark:text-white"
                : "border-red-500 text-red-600 dark:text-red-400"
            }`}
          />
        </div>
        {!colsValid && (
          <p className="text-xs text-red-500">Must be between 7 and 30</p>
        )}
      </div>

      {/* Mines */}
      <div className="space-y-1">
        <label
          className={`block text-sm font-medium ${
            minesValid ? "text-zinc-700 dark:text-zinc-300" : "text-red-600 dark:text-red-400"
          }`}
        >
          Mines
        </label>
        <div className="flex items-center gap-4">
          <Slider
            min={1}
            max={200}
            step={1}
            value={[minesValid ? mine : 1]}
            onValueChange={(val) => setMineInput(val[0].toString())}
            className={minesValid ? "" : "border border-red-500 rounded-lg p-1"}
          />
          <input
            type="text"
            value={mineInput}
            onChange={(e) => setMineInput(e.target.value)}
            onBlur={() => handleBlur(mineInput, 1, 200, setMineInput)}
            className={`w-16 px-2 py-1 border rounded-md text-sm bg-white dark:bg-zinc-800 ${
              minesValid
                ? "text-zinc-900 dark:text-white"
                : "border-red-500 text-red-600 dark:text-red-400"
            }`}
          />
        </div>
        {!minesValid && (
          <p className="text-xs text-red-500">Must be valid and ≤ rows × columns - 1</p>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Button
          onClick={() => applySettings(row, col, mine)}
          disabled={anyInvalid}
          className="cursor-pointer px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default Settings;
