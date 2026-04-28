import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { ICard } from '../../../../../common/interfaces/ICard';
import { AppDispatch } from '../../../../../store/store';
import { deleteCardThunk, fetchBoardThunk, updateCardThunk } from '../../../../../store/boards/thunks';

interface UseCardData {
  changeChekedStatus(isChecked: boolean): void;
  handleSaveTitle(title: string, setVisibleChangeTitile: (isVisible: boolean) => void): void;
  handleDeleteCard(): void;
}

interface UseCardProps {
  boardId: number;
  listId: number;
  cardData: ICard;
}

export function useCard({ boardId, listId, cardData }: UseCardProps): UseCardData {
  const dispatch = useDispatch<AppDispatch>();
  const changeChekedStatus = async (isChecked: boolean): Promise<void> => {
    try {
      const payload = {
        boardId,
        cardData: {
          id: cardData.id,
          list_id: listId,
          custom: {
            ...cardData.custom,
            isChecked,
          },
        } as ICard,
      };
      await dispatch(updateCardThunk(payload));
      await dispatch(fetchBoardThunk(boardId));
    } catch (error) {
      Alert.alert(`Erro updating card`);
    }
  };
  const handleSaveTitle = async (
    newTitle: string,
    setVisibleChangeTitile: (isVisible: boolean) => void
  ): Promise<void> => {
    try {
      const payload = {
        boardId,
        cardData: {
          id: cardData.id,
          title: newTitle,
          list_id: listId,
        } as ICard,
      };
      await dispatch(updateCardThunk(payload)).unwrap();
    } catch (error) {
      Alert.alert('Error updating card title.');
    } finally {
      setVisibleChangeTitile(false);
    }
  };
  const handleDeleteCard = async (): Promise<void> => {
    try {
      const payload = {
        boardId,
        cardData: { id: cardData.id, list_id: listId } as ICard,
      };
      await dispatch(deleteCardThunk(payload));
      await dispatch(fetchBoardThunk(boardId));
    } catch (error) {
      Alert.alert(`Erro updating card`);
    }
  };
  return { changeChekedStatus, handleSaveTitle, handleDeleteCard };
}
