import { configureStore } from '@reduxjs/toolkit';
import spreadsheetReducer from './spreadsheetSlice';
import { validationMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    spreadsheet: spreadsheetReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(validationMiddleware.middleware)
}); 