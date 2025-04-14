import React from "react";

const ProbabilityLegend = () => {
  return (
    <div className="w-fit flex items-center rounded shadow overflow-hidden text-xs font-bold text-white">
      {/* SAFE box */}
      <div
        className="text-black h-[50px] w-[70px] flex items-center justify-center"
        style={{ backgroundColor: "hsl(120, 100%, 30%)" }}
      >
        SAFE
      </div>

      {/* Smooth gradient strip */}
      <div
        className="w-[220px] h-[50px] relative"
        style={{
          background: `
            linear-gradient(to right,
              hsl(120, 100%, 70%),
              hsl(90, 100%, 70%),
              hsl(60, 100%, 70%),
              hsl(30, 100%, 70%),
              hsl(0, 100%, 70%)
            )
          `,
        }}
      >
        {/* UNCERTAIN label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-60 text-black px-2 py-1 rounded">
          UNCERTAIN
        </div>
      </div>

      {/* MINE box */}
      <div
        className="text-black h-[50px] w-[70px] flex items-center justify-center"
        style={{ backgroundColor: "hsl(0, 100%, 45%)" }}
      >
        MINE
      </div>
    </div>
  );
};

export default ProbabilityLegend;
