import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { IBoard } from '../common/interfaces/IBoard';
import { getBoard, getBoards, putBoardUpdates } from '../api/boardsService';

interface UpdateBoardPayload {
  boardId: number;
  boardData: IBoard;
}

interface BoardState {
  boards: IBoard[];
  activeBoard: IBoard | null;
}

export const fetchAllBoardsThunk = createAsyncThunk('boards/fetchAll', async () => {
  const data = await getBoards();
  return data;
});

export const fetchBoardThunk = createAsyncThunk('board/fetchBoard', async (boardId: number, { rejectWithValue }) => {
  try {
    const response = await getBoard(boardId);
    if (!response) return rejectWithValue('No board found');
    return { ...response, id: Number(boardId) };
  } catch (error) {
    Alert.alert(`Error getting borad data.`);
    return rejectWithValue(error);
  }
});

export const updateBoardThunk = createAsyncThunk(
  'board/updateBoard',
  async (payload: UpdateBoardPayload, { rejectWithValue }) => {
    const { boardData, boardId } = payload;
    try {
      const response = await putBoardUpdates(boardData, boardId);
      if (response !== 'Updated') return rejectWithValue('No board found');
      return { ...boardData, id: boardId };
    } catch (error) {
      Alert.alert(`Error updating borad properties.`);
      return rejectWithValue(error);
    }
  }
);

const initialState: BoardState = {
  boards: [],
  activeBoard: null,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardThunk.fulfilled, (state, action) => {
      const builderState = state;
      builderState.activeBoard = action.payload ?? null;
    });
    builder.addCase(fetchAllBoardsThunk.fulfilled, (state, action) => {
      const builderState = state;
      builderState.boards = action.payload;
    });
    builder.addCase(updateBoardThunk.fulfilled, (state, action) => {
      const builderState = state;
      const updatedBoard = action.payload;
      if (!updatedBoard) return;
      if (builderState.activeBoard) {
        if (!builderState.activeBoard.id || builderState.activeBoard.id === updatedBoard.id) {
          builderState.activeBoard.title = updatedBoard.title;
        }
      }
      const boardIndex = state.boards.findIndex((board) => board.id === updatedBoard.id);
      if (boardIndex !== -1) {
        builderState.boards[boardIndex].title = updatedBoard.title;
      }
    });
  },
});

export default boardSlice.reducer;
