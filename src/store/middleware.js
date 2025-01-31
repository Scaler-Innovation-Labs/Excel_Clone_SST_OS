import { createListenerMiddleware } from '@reduxjs/toolkit';
import { updateCell, setError, markInvalidCell } from './spreadsheetSlice';

export const validationMiddleware = createListenerMiddleware();

validationMiddleware.startListening({
  actionCreator: updateCell,
  effect: async (action, listenerApi) => {
    const { row, col, value } = action.payload;
    
    // Validation logic
    const isValid = /^[0-9]*$/.test(value) && value.length <= 10;
    
    if (!isValid) {
      listenerApi.dispatch(setError('Invalid input: Only numbers are allowed (max 10 characters)'));
      listenerApi.dispatch(markInvalidCell({ row, col, invalid: true }));
    } else {
      listenerApi.dispatch(setError(null));
      listenerApi.dispatch(markInvalidCell({ row, col, invalid: false }));
    }
  }
});