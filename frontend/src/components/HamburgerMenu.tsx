// components/HamburgerMenu.tsx
"use client";

import React from "react";

type HamburgerMenuProps = {
  onClick: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer fixed top-4 left-4 z-[9999] flex flex-col justify-center items-center w-10 h-10 space-y-1 group"
      aria-label="Open Settings"
    >
      <span className="w-6 h-1 bg-[hsl(120,100%,30%)] transition-all group-hover:w-7" />
      <span className="w-6 h-1 bg-[hsl(60,100%,70%)] transitaion-all group-hover:w-7" />
      <span className="w-6 h-1 bg-[hsl(0,100%,45%)] transition-all group-hover:w-7" />
    </button>
  );
};

export default HamburgerMenu;
