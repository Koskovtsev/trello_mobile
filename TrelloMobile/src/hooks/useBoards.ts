import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoard, postNewBoard } from '../api/boardsService';
import { IBoard } from '../common/interfaces/IBoard';
import { AppDispatch, RootState } from '../store/store';
import { fetchAllBoardsThunk } from '../store/boardsSlice';

interface IUseBoardData {
  boards: IBoard[];
  createBoard(newTitle: string, texture: string): Promise<boolean>;
  // fetchBoards(): Promise<void>;
  deleteBoardById(boardId: number): Promise<void>;
}

export function useBoards(): IUseBoardData {
  // const [boards, setBoards] = useState<IBoard[]>([]);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const dispatch = useDispatch<AppDispatch>();
  // async function fetchBoards(): Promise<void> {
  //   try {
  //     const data = await getBoards();
  //     // setBoards(data);
  //   } catch (error) {
  //     Alert.alert(`Error to get boards data`);
  //   }
  // }
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
      const response = await deleteBoard(boardId);
      if (response === 'Deleted') {
        dispatch(fetchAllBoardsThunk());
      }
    } catch (error) {
      Alert.alert(`Error deleting board`);
    }
  };
  return { boards, createBoard, deleteBoardById };
}
