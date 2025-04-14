import { useEffect, useState } from "react";
import { HeaderData } from "@/types/types";
import ProbabilityLegend from "./Legend";
import { Button } from "@/components/ui/button";

const MinesweeperHeader: React.FC<HeaderData> = ({
  setShowProbability,
  showProbability,
  AISolvingRef,
  solverRef,
}) => {
  const [isSolving, setIsSolving] = useState(AISolvingRef.current);

  // Sync local state with ref every animation frame
  useEffect(() => {
    let frame: number;

    const syncRef = () => {
      if (AISolvingRef.current !== isSolving) {
        setIsSolving(AISolvingRef.current);
      }
      frame = requestAnimationFrame(syncRef);
    };

    syncRef(); // start syncing

    return () => cancelAnimationFrame(frame); // cleanup
  }, [AISolvingRef, isSolving]);

  const toggleSolving = () => {
    solverRef.current?.clickSolve();
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px] flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg ">
        {/* Solve Button */}
        <Button
          onClick={toggleSolving}
          className={`flex-shrink-0 cursor-pointer px-6 py-2 rounded-lg transition font-semibold ${
            isSolving
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          Solve
        </Button>

        {/* Legend */}
        <div className="flex-grow flex justify-center mx-4">
          <ProbabilityLegend />
        </div>

        {/* Probability Toggle Button */}
        <Button
          onClick={() => setShowProbability((x) => !x)}
          className={`flex-shrink-0 cursor-pointer px-6 py-2 rounded-lg transition font-semibold ${
            showProbability
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          Probability
        </Button>
      </div>
    </div>
  );
};

export default MinesweeperHeader;
