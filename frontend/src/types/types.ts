import { Dispatch, MutableRefObject, Ref, RefObject, SetStateAction } from "react";


export type CellData = {

    // Static
    row: number;
    column: number;
    isMine: boolean;
    numColumns: number; 
    encodedValue: string; 
    adjacentMineCount: number;
    adjacentCellCount: number; 

    // Dynamic
    revealed: boolean; 
    probability: number; 
    someInformation: boolean; 
    flagged: boolean; 
    adjacentUndeterminedMineCount: number; 
    adjacentUndeterminedCellCount: number; 
    isDetermined: boolean; 
    clicked: boolean; 

};

export type RuleData = {
    num_undetermined_mines: number; 
    undetermined_cells: string[];
};

export type SolverHandle = {
    clickSolve: () => void;
};

export type HeaderData = {
    showProbability: boolean;
    setShowProbability: Dispatch<SetStateAction<boolean>>;
    AISolvingRef: RefObject<boolean>;
    solverRef: RefObject<SolverHandle | null>;
}

export type SolverRequest = {
    rules: RuleData[];
    undetermined_mine_count: number;
    num_uninformed_cells: number; 
    
}

export type BoardHeaderProps = {
  undeterminedMines: number;
  time: number;
  gameOver: boolean;
  lost: boolean;
  onReset: () => void;
};

export type BoardData = {
    rows: number; 
    columns: number; 
    mineCount: number; 
    restart: number; 
    setRestart: Dispatch<SetStateAction<number>>;
    showProbability: boolean; 
    AISolvingRef: RefObject<boolean>;
};

export type SettingsData = {
    rows: number; 
    columns: number; 
    mines: number; 
    applySettings: (rows: number, columns: number, mines: number) => void;
};