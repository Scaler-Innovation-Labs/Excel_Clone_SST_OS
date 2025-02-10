import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCell,
  updateCell,
  setFormulaBarValue,
  selectSpreadsheetData,
  selectSelectedCell,
  selectFormulaBarValue,
  selectError,
  selectInvalidCells,
  selectTooltipText
} from '../store/spreadsheetSlice';
import './Tooltip.css';

const Tooltip = ({ text, position }) => {
  return (
    <div className={`tooltip ${position}`}>
      {text}
    </div>
  );
};

const ExcelClone = () => {
  const ROWS = 20;
  const COLS = 26;
  const dispatch = useDispatch();
  
  const data = useSelector(selectSpreadsheetData);
  const selectedCell = useSelector(selectSelectedCell);
  const formulaBarValue = useSelector(selectFormulaBarValue);
  const error = useSelector(selectError);
  const invalidCells = useSelector(selectInvalidCells);
  const tooltipText = useSelector(selectTooltipText);

  const getColumnLabel = (index) => String.fromCharCode(65 + index);

  const handleCellSelect = (rowIndex, colIndex) => {
    dispatch(selectCell({ row: rowIndex, col: colIndex }));
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    dispatch(updateCell({ row: rowIndex, col: colIndex, value }));
  };

  const handleKeyDown = (e) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(row - 1, 0);
        break;
      case 'ArrowDown':
        newRow = Math.min(row + 1, ROWS - 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(col - 1, 0);
        break;
      case 'ArrowRight':
        newCol = Math.min(col + 1, COLS - 1);
        break;
      default:
        return;
    }

    if (newRow !== row || newCol !== col) {
      handleCellSelect(newRow, newCol);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell]);

  const handleDoubleClick = (rowIndex, colIndex) => {
    handleCellSelect(rowIndex, colIndex);
    const cellInput = document.getElementById(`cell-${rowIndex}-${colIndex}`);
    if (cellInput) {
      cellInput.select();
    }
  };

  const Cell = ({ value, rowIndex, colIndex }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const isInvalid = invalidCells.includes(`${rowIndex}-${colIndex}`);

    return (
      <td
        className={`border border-gray-300 p-0 relative ${
          selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-50' : ''
        }`}
      >
        <div
          className="cell"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <input
            id={`cell-${rowIndex}-${colIndex}`}
            type="text"
            className={`w-full h-full px-2 py-1 border-none outline-none bg-transparent ${
              isInvalid ? 'bg-red-50' : ''
            }`}
            value={value}
            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
            onClick={() => handleCellSelect(rowIndex, colIndex)}
            onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
          />
          {showTooltip && <Tooltip text={tooltipText} position="bottom" />}
        </div>
      </td>
    );
  };

  // Rest of the component remains the same...
  return (
    <div className="flex flex-col h-screen">
      {/* Formula Bar */}
      <div className="flex items-center p-2 bg-gray-100">
        <div className="flex space-x-2 items-center">
          <div className="font-mono bg-white px-2 py-1 border border-gray-300">
            {selectedCell ? `${getColumnLabel(selectedCell.col)}${selectedCell.row + 1}` : ''}
          </div>
          <input
            type="text"
            className="w-96 px-2 py-1 border border-gray-300"
            value={formulaBarValue}
            onChange={(e) => {
              const value = e.target.value;
              if (selectedCell) {
                handleCellChange(selectedCell.row, selectedCell.col, value);
              }
              dispatch(setFormulaBarValue(value));
            }}
          />
        </div>
        {error && <span className="text-red-500 text-sm ml-4">{error}</span>}
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="w-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white font-semibold border border-slate-700 
                           shadow-sm sticky top-0 z-20"></th>
              {Array(COLS).fill().map((_, i) => (
                <th 
                  key={i} 
                  className="w-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white font-semibold px-3 py-2 
                           border border-slate-700
                           hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-700 transition-all duration-150
                           shadow-sm text-center tracking-wide sticky top-0 z-10 text-sm"
                >
                  {getColumnLabel(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(ROWS).fill().map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium border border-slate-700 
                             text-center py-1.5 hover:from-slate-800 hover:to-slate-700 transition-all duration-150 
                             sticky left-0 z-10 text-sm">
                  {rowIndex + 1}
                </td>
                {Array(COLS).fill().map((_, colIndex) => (
                  <Cell
                    key={colIndex}
                    value={data[rowIndex][colIndex]}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelClone;