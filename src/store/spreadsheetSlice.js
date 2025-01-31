import { createSlice } from "@reduxjs/toolkit";


const ROWS = 20;
const COLS = 26; // A to Z

const initialState = {
    data: Array(ROWS).fill().map(() => Array(COLS).fill('')),
    selectedCell: null,
    formulaBarValue: '',
    error: null,
    invalidCells: [],
    tooltipText: ''
  };
  
export const spreadsheetSlice = createSlice({
    name: 'spreadsheet',
    initialState,
    reducers: {
        selectCell: (state, action) => {
          const { row, col } = action.payload;
          state.selectedCell = { row, col };
          state.formulaBarValue = state.data[row][col];
          state.error = null;
        },
        updateCell: (state, action) => {
          const { row, col, value } = action.payload;
          // Validation moved to middleware
          state.data[row][col] = value;
          state.formulaBarValue = value;
        },
        setError: (state, action) => {
          state.error = action.payload;
        },
        markInvalidCell: (state, action) => {
          const { row, col, invalid } = action.payload;
          const cellKey = `${row}-${col}`;
          if (invalid) {
            state.invalidCells.push(cellKey);
          } else {
            state.invalidCells = state.invalidCells.filter(key => key !== cellKey);
          }
        },
        setFormulaBarValue: (state, action) => {
          state.formulaBarValue = action.payload;
        },
        setTooltipText: (state, action) => {
          state.tooltipText = action.payload;
        }
      },
  });
  
  export const {
    selectCell,
    updateCell,
    setError,
    markInvalidCell,
    setFormulaBarValue,
    setTooltipText
  } = spreadsheetSlice.actions;


// Selectors
export const selectSpreadsheetData = state => state.spreadsheet.data;
export const selectSelectedCell = state => state.spreadsheet.selectedCell;
export const selectFormulaBarValue = state => state.spreadsheet.formulaBarValue;
export const selectError = state => state.spreadsheet.error;
export const selectInvalidCells = state => state.spreadsheet.invalidCells;
export const selectTooltipText = state => state.spreadsheet.tooltipText;

export default spreadsheetSlice.reducer;