import React, { useState } from 'react';

const ROWS = 20;
const COLS = 26; // A to Z
const MAX_CELL_LENGTH = 50; // Maximum characters allowed in a cell

const ExcelClone = () => {
  // State for cell data
  const [data, setData] = useState(
    Array(ROWS).fill().map(() => Array(COLS).fill(''))
  );
  
  // State for selected cell
  const [selectedCell, setSelectedCell] = useState(null);
  
  // State for formula bar
  const [formulaBarValue, setFormulaBarValue] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState(
    Array(ROWS).fill().map(() => Array(COLS).fill(null))
  );

  // State to track which cells should be numeric
  const [numericCells, setNumericCells] = useState(
    Array(ROWS).fill().map(() => Array(COLS).fill(false))
  );

  // Convert column index to letter (0 = A, 1 = B, etc.)
  const getColumnLabel = (index) => String.fromCharCode(65 + index);

  // Validate cell content
  const validateCell = (value, isNumeric) => {
    if (value.length > MAX_CELL_LENGTH) {
      return `Maximum length is ${MAX_CELL_LENGTH} characters`;
    }
    if (isNumeric && value !== '') {
      if (isNaN(value)) {
        return 'Please enter a valid number';
      }
    }
    return null;
  };

  // Toggle numeric validation for a cell
  const toggleNumericCell = (rowIndex, colIndex) => {
    const newNumericCells = [...numericCells];
    newNumericCells[rowIndex][colIndex] = !newNumericCells[rowIndex][colIndex];
    setNumericCells(newNumericCells);
    
    // Revalidate the cell with new numeric setting
    const currentValue = data[rowIndex][colIndex];
    const error = validateCell(currentValue, newNumericCells[rowIndex][colIndex]);
    
    // If the current value becomes invalid with the new setting, clear the cell
    if (error) {
      const newData = [...data];
      newData[rowIndex][colIndex] = '';
      setData(newData);
      setFormulaBarValue('');
    }
    
    const newErrors = [...errors];
    newErrors[rowIndex][colIndex] = error;
    setErrors(newErrors);
  };

  // Handle cell selection
  const handleCellSelect = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setFormulaBarValue(data[rowIndex][colIndex]);
  };

  // Handle cell value change
  const handleCellChange = (rowIndex, colIndex, value) => {
    const isNumeric = numericCells[rowIndex][colIndex];
    const error = validateCell(value, isNumeric);
    
    // Update errors
    const newErrors = [...errors];
    newErrors[rowIndex][colIndex] = error;
    setErrors(newErrors);
    
    if (!error) {
      // Only update both data and formula bar if valid
      const newData = [...data];
      newData[rowIndex][colIndex] = value;
      setData(newData);
      setFormulaBarValue(value);
    } else {
      // If invalid, keep the old value in both data and formula bar
      setFormulaBarValue(data[rowIndex][colIndex]);
    }
  };

  // Handle formula bar change
  const handleFormulaBarChange = (value) => {
    if (selectedCell) {
      const isNumeric = numericCells[selectedCell.row][selectedCell.col];
      const error = validateCell(value, isNumeric);
      
      // Update errors
      const newErrors = [...errors];
      newErrors[selectedCell.row][selectedCell.col] = error;
      setErrors(newErrors);
      
      if (!error) {
        // Only update both data and formula bar if valid
        const newData = [...data];
        newData[selectedCell.row][selectedCell.col] = value;
        setData(newData);
        setFormulaBarValue(value);
      } else {
        // If invalid, keep the old value in both data and formula bar
        setFormulaBarValue(data[selectedCell.row][selectedCell.col]);
      }
    }
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
            onChange={(e) => handleFormulaBarChange(e.target.value)}
          />
          {selectedCell && (
            <button
              className={`px-3 py-1 rounded ${
                numericCells[selectedCell.row][selectedCell.col]
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              }`}
              onClick={() => toggleNumericCell(selectedCell.row, selectedCell.col)}
            >
              123
            </button>
          )}
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
                        ? 'bg-blue-50'
                        : ''
                    }`}
                  >
                    <input
                      type="text"
                      className={`w-full h-full px-2 py-1 border-none outline-none bg-transparent ${
                        errors[rowIndex][colIndex] ? 'border-2 border-red-500' : ''
                      }`}
                      value={data[rowIndex][colIndex]}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onClick={() => handleCellSelect(rowIndex, colIndex)}
                    />
                    {errors[rowIndex][colIndex] && (
                      <div className="absolute -bottom-6 left-0 bg-red-100 text-red-600 text-xs p-1 rounded shadow z-10">
                        {errors[rowIndex][colIndex]}
                      </div>
                    )}
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