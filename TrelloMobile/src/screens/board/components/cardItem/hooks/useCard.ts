import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { ICard } from '../../../../../common/interfaces/ICard';
import { AppDispatch } from '../../../../../store/store';
import { fetchBoardThunk, updateCardThunk } from '../../../../../store/boards/thunks';

interface UseCardData {
  changeChekedStatus(isChecked: boolean): void;
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
  return { changeChekedStatus };
}
