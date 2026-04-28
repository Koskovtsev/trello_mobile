import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TextureTarget =
  | { type: 'list'; boardId: number; listId: number }
  | { type: 'card'; boardId: number; listId: number; cardId: number }
  | { type: 'board'; boardId: number };

type CardMenuTarget = {
  boardId: number;
  listId: number;
  cardId: number;
};

interface UiState {
  textureModal: {
    isOpen: boolean;
    target: TextureTarget | null;
  };
  cardMenu: {
    isOpen: boolean;
    target: CardMenuTarget | null;
  };
}

const initialState: UiState = {
  textureModal: {
    isOpen: false,
    target: null,
  },
  cardMenu: {
    isOpen: false,
    target: null,
  },
};

const uiSlice = createSlice({
  name: 'ui/textureModal',
  initialState,
  reducers: {
    openTextureModal(state, action: PayloadAction<TextureTarget>) {
      const modalState = state;
      modalState.textureModal.isOpen = true;
      modalState.textureModal.target = action.payload;
    },
    closeTextureModal(state) {
      const modalState = state;
      modalState.textureModal.isOpen = false;
      modalState.textureModal.target = null;
    },
    openCardModal(state, action: PayloadAction<CardMenuTarget>) {
      const modalState = state;
      modalState.cardMenu.isOpen = true;
      modalState.cardMenu.target = action.payload;
    },
    closeCardModal(state) {
      const modalState = state;
      modalState.cardMenu.isOpen = false;
      modalState.cardMenu.target = null;
    },
  },
});

export const { openTextureModal, closeTextureModal, openCardModal, closeCardModal } = uiSlice.actions;
export default uiSlice.reducer;
