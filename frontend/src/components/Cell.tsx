import { CellData } from "@/types/types";
import styles from "../styles/Cell.module.css";

type CellProps = {
  cellData: CellData;
  onClick: (row: number, column: number, e: React.MouseEvent) => void;
  determinedFirstProbability: boolean; 
  showProbability: boolean; 
  AISolving: boolean;
};

const Cell = ({ cellData, onClick, determinedFirstProbability, showProbability, AISolving }: CellProps) => {

  const handleClick = (e: React.MouseEvent): void => {
    // console.log("CLICKED");

    if (cellData.revealed || AISolving) {
      return;
    }

    onClick(cellData.row, cellData.column, e);
  };

  // Determines what color an adjacent unrevealed 
  // cell should be, with green cells indicating 
  // safety, and red cels indicating danger
  const getProbabilityColor = (p: number): string => {
    if (p === 0) return `hsl(120, 100.00%, 30.00%)`;
    if (p === 1) return `hsl(0, 100.00%, 45.00%)`;

    // Clamp p between 0 and 1
    const clamped = Math.min(1, Math.max(0, p));

    // Hue from 0 (red) to 120 (green)
    const hue = (1 - clamped) * 120;

    return `hsl(${hue}, 100%, 70%)`;
  };

  // Code that handles how the cell is rendered
  let content: React.ReactNode = "";

  if (cellData.flagged) {
    content = <img src="/flag.png" alt="flag" className={styles.flagIcon} />;
  }

  else if (cellData.revealed) {
    if (cellData.isMine && !cellData.clicked) {
      content = <img src="/mine.png" alt="flag" className={styles.flagIcon} />;
    } else if (cellData.isMine && cellData.clicked) {
      content = (
        <img src="/clicked_mine.png" alt="flag" className={styles.flagIcon} />
      );
    } else if (cellData.adjacentMineCount > 0) {
      content = cellData.adjacentMineCount.toString();
    }
  } 

  let className = styles.cell;
  if (cellData.revealed) className += ` ${styles.revealed}`;
  if (cellData.flagged) className += ` ${styles.flagged}`;

  return (
    <div
      style={{
        backgroundColor:
          !cellData.revealed && determinedFirstProbability && showProbability
            ? getProbabilityColor(cellData.probability)
            : undefined,
      }}
      className={className}
      onMouseDown={(e) => {
        handleClick(e);
      }}
      onContextMenu={(e) => e.preventDefault()}
      data-count={cellData.adjacentMineCount || undefined}
    >
      {content}
    </div>
  );
};

export default Cell;
