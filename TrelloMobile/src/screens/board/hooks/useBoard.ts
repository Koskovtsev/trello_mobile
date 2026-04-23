import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
// import { deleteBoard } from '../../../api/boardsService';
import { IBoard } from '../../../common/interfaces/IBoard';
import { AppDispatch } from '../../../store/store';
import { updateBoardThunk } from '../../../store/boardsSlice';

interface IUseCardData {
  //   handleDeleteBoard(): void;
  handleSaveTitle(title: string, setVisibleChangeTitile: (isVisible: boolean) => void): void;
}
interface IUseCardProps {
  boardId: number;
  boardData?: IBoard;
  //   refreshBoard(): void;
}
export function useBoard({ boardId }: IUseCardProps): IUseCardData {
  const dispatch = useDispatch<AppDispatch>();
  //   const handleDeleteBoard = async (): Promise<void> => {
  //     try {
  //       const response = await deleteBoard(boardId);
  //       if (response === 'Deleted') await dispatch(updateBoardThunk(payload)).unwrap();
  //     } catch (error) {
  //       Alert.alert('Error deleting board.');
  //     }
  //   };
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
      //   const boardData: IBoard = { title: newTitle };
      //   const response = await putBoardUpdates(boardData, boardId);
      //   if (response === 'Updated') refreshBoard();
    } catch (error) {
      Alert.alert('Error updating board title.');
    } finally {
      setVisibleChangeTitile(false);
    }
  };
  return { handleSaveTitle };
}
