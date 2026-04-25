import { configureStore } from '@reduxjs/toolkit';
import boardsReduser from './boards/slice';

export const store = configureStore({
  reducer: {
    boards: boardsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
