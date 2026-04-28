import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { IBoard } from '../../../common/interfaces/IBoard';
import { AppDispatch } from '../../../store/store';
import { deleteListThunk, fetchBoardThunk, updateBoardThunk } from '../../../store/boards/thunks';
import { IList } from '../../../common/interfaces/IList';

interface IUseBoardData {
  handleSaveTitle(title: string, setVisibleChangeTitile: (isVisible: boolean) => void): void;
  deleteListById(listItem: IList): Promise<void>;
}
interface IUseBoardProps {
  boardId: number;
  boardData?: IBoard;
}
export function useBoard({ boardId }: IUseBoardProps): IUseBoardData {
  const dispatch = useDispatch<AppDispatch>();

  const handleSaveTitle = async (
    newTitle: string,
    setVisibleChangeTitile: (isVisible: boolean) => void
  ): Promise<void> => {
    try {
      const payload = {
        boardId,
        boardData: { title: newTitle } as IBoard,
      };
      await dispatch(updateBoardThunk(payload)).unwrap();
    } catch (error) {
      Alert.alert('Error updating board title.');
    } finally {
      setVisibleChangeTitile(false);
    }
  };

  const deleteListById = async (listItem: IList): Promise<void> => {
    try {
      if (!listItem.id) return;
      const payload = {
        boardId,
        listData: listItem,
      };
      dispatch(deleteListThunk(payload)).unwrap();
      await dispatch(fetchBoardThunk(boardId));
    } catch (error) {
      Alert.alert(`Error deleting list`);
    }
  };

  return { handleSaveTitle, deleteListById };
}
