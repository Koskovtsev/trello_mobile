import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { IList } from '../../../../../common/interfaces/IList';
import { createCardThunk, fetchBoardThunk, updateListThunk } from '../../../../../store/boards/thunks';
import { AppDispatch } from '../../../../../store/store';
import { ICard } from '../../../../../common/interfaces/ICard';

interface UseListData {
  handleSaveTitle(title: string, setVisibleChangeTitile: (isVisible: boolean) => void): void;
  handleAddCard(title: string, position: number, setVisibleAddCardForm: (isVisible: boolean) => void): void;
}
interface UseListProps {
  boardId: number;
  listData: IList;
}

export function useList({ boardId, listData }: UseListProps): UseListData {
  const dispatch = useDispatch<AppDispatch>();
  const handleSaveTitle = async (
    newTitle: string,
    setVisibleChangeTitile: (isVisible: boolean) => void
  ): Promise<void> => {
    try {
      const payload = {
        boardId,
        listData: { title: newTitle, id: listData.id } as IList,
      };
      await dispatch(updateListThunk(payload)).unwrap();
    } catch (error) {
      Alert.alert('Error updating list title.');
    } finally {
      setVisibleChangeTitile(false);
    }
  };
  const handleAddCard = async (
    title: string,
    position: number,
    setVisibleAddCardForm: (isVisible: boolean) => void
  ): Promise<void> => {
    try {
      const payload = {
        boardId,
        cardData: { title, list_id: listData.id, position } as ICard,
      };
      await dispatch(createCardThunk(payload)).unwrap();
      await dispatch(fetchBoardThunk(boardId));
    } catch (error) {
      Alert.alert('Error creating new card.');
    } finally {
      setVisibleAddCardForm(false);
    }
  };
  return { handleSaveTitle, handleAddCard };
}
