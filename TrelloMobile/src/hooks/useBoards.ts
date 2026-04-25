import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postNewBoard } from '../api/boardsService';
import { IBoard } from '../common/interfaces/IBoard';
import { AppDispatch, RootState } from '../store/store';
import { deleteBoardThunk, fetchAllBoardsThunk } from '../store/boards/thunks';

interface IUseBoardData {
  boards: IBoard[];
  createBoard(newTitle: string, texture: string): Promise<boolean>;
  deleteBoardById(boardId: number): Promise<void>;
}

export function useBoards(): IUseBoardData {
  const boards = useSelector((state: RootState) => state.boards.boards);
  const dispatch = useDispatch<AppDispatch>();

  const createBoard = async (newTitle: string, texture: string): Promise<boolean> => {
    const dataToSend: IBoard = { title: newTitle, custom: { background: texture } };
    try {
      const response = await postNewBoard(dataToSend);
      if (response === 'Created') {
        dispatch(fetchAllBoardsThunk());
        return true;
      }
    } catch (error) {
      Alert.alert('Error creating new board');
    }
    return false;
  };

  const deleteBoardById = async (boardId: number): Promise<void> => {
    try {
      dispatch(deleteBoardThunk(boardId));
    } catch (error) {
      Alert.alert(`Error deleting board`);
    }
  };
  return { boards, createBoard, deleteBoardById };
}
