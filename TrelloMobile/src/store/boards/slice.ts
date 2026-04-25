import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../common/interfaces/IBoard';
import {
  createCardThunk,
  deleteBoardThunk,
  deleteListThunk,
  fetchAllBoardsThunk,
  fetchBoardThunk,
  updateBoardThunk,
  updateCardThunk,
  updateListThunk,
} from './thunks';

interface BoardState {
  boards: IBoard[];
  activeBoard: IBoard | null;
}

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
      builderState.activeBoard = action.payload;
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
    builder.addCase(deleteBoardThunk.fulfilled, (state, action) => {
      const deletedBoardId = action.payload;
      const builderState = state;
      builderState.boards = state.boards.filter((board) => board.id !== deletedBoardId);
      if (builderState.activeBoard && builderState.activeBoard.id === deletedBoardId) {
        builderState.activeBoard = null;
      }
    });
    builder.addCase(updateListThunk.fulfilled, (state, action) => {
      const builderState = state;
      const updatedList = action.payload;
      if (!updatedList) return;
      if (builderState.activeBoard?.lists && builderState.activeBoard.id === updatedList.boardId) {
        const list = builderState.activeBoard.lists.find((l) => l.id === updatedList.listData.id);
        if (list) {
          Object.assign(list, updatedList.listData);
        }
      }
    });
    builder.addCase(updateCardThunk.fulfilled, (state, action) => {
      const builderState = state;
      const updatedCard = action.payload;
      if (!updatedCard) return;
      const list = builderState.activeBoard?.lists?.find((l) => l.id === updatedCard.cardData.list_id);
      const card = list?.cards?.find((c) => c.id === updatedCard.cardData.id);
      if (card) {
        Object.assign(card, updatedCard.cardData);
      }
    });
    builder.addCase(deleteListThunk.fulfilled, (state, action) => {
      const builderState = state;
      const deletedListId = action.payload.listData.id;
      if (!builderState.activeBoard?.lists) return;
      builderState.activeBoard.lists = builderState.activeBoard.lists.filter((list) => list.id !== deletedListId);
    });
  },
});

export default boardSlice.reducer;
