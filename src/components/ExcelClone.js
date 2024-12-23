import React, { useState, useEffect } from 'react';
import './Tooltip.css'; // Add tooltip styles

const Tooltip = ({ text, position }) => {
  return (
    <div className={`tooltip ${position}`}>
      {text}
    </div>
  );
};

const ExcelClone = () => {
  const ROWS = 20;
  const COLS = 26; // A to Z
  const [data, setData] = useState(Array(ROWS).fill().map(() => Array(COLS).fill('')));
  const [selectedCell, setSelectedCell] = useState(null);
  const [formulaBarValue, setFormulaBarValue] = useState('');
  const [tooltipText, setTooltipText] = useState(''); // State for dynamic tooltip

  const getColumnLabel = (index) => String.fromCharCode(65 + index);

  const handleCellSelect = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setFormulaBarValue(data[rowIndex][colIndex]);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
    setFormulaBarValue(value);
  };

  const handleKeyDown = (e) => {
    const { row, col } = selectedCell || {};

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setTooltipText("Use Arrow Keys to Navigate");
    } else if (e.key === 'Tab') {
      setTooltipText("Use Tab to Move to the Next Cell");
    } else if (e.key === 'Enter') {
      setTooltipText("Press Enter to Confirm");
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell]);

  const Cell = ({ value, rowIndex, colIndex }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <td
        className={`border border-gray-300 p-0 relative ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-50' : ''}`}
      >
        <div
          className="cell"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <input
            type="text"
            className="w-full h-full px-2 py-1 border-none outline-none bg-transparent"
            value={value}
            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
            onClick={() => handleCellSelect(rowIndex, colIndex)}
          />
          {showTooltip && <Tooltip text={tooltipText} position="bottom" />}
        </div>
      </td>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <div className="flex items-center p-2 bg-gray-200">
        <div className="flex space-x-2 items-center">
          <div className="font-mono bg-white px-2 py-1 border border-gray-300">
            {selectedCell ? `${getColumnLabel(selectedCell.col)}${selectedCell.row + 1}` : ''}
          </div>
          <input
            type="text"
            className="w-96 px-2 py-1 border border-gray-300"
            value={formulaBarValue}
            onChange={(e) => {
              setFormulaBarValue(e.target.value);
              if (selectedCell) {
                handleCellChange(selectedCell.row, selectedCell.col, e.target.value);
              }
            }}
          />
        </div>
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="w-12 bg-gray-100 border border-gray-300"></th>
              {Array(COLS).fill().map((_, i) => (
                <th key={i} className="w-24 bg-gray-100 border border-gray-300 px-2">
                  {getColumnLabel(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(ROWS).fill().map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="bg-gray-100 border border-gray-300 text-center">
                  {rowIndex + 1}
                </td>
                {Array(COLS).fill().map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 p-0 relative ${
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? 'bg-blue-50 border-4 border-pink-300'
                        : ''
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full h-full px-2 py-1 border-none outline-none bg-transparent"
                      value={data[rowIndex][colIndex]}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onClick={() => handleCellSelect(rowIndex, colIndex)}
                    />
                  </td>
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
