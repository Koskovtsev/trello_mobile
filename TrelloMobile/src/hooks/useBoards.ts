
import { useState } from 'react';
import { deleteBoard, getBoards, postNewBoard } from '../api/boardsService';
import { IBoard } from '../common/interfaces/IBoard';
import { Alert } from 'react-native';

interface IUseBoardData {
  boards: IBoard[];
  createBoard(newTitle: string, texture: string): Promise<boolean>;
  fetchBoards(): Promise<void>;
  deleteBoardById(boardId: number): Promise<void>;
}

export function useBoards(): IUseBoardData {
  const [boards, setBoards] = useState<IBoard[]>([]);

  async function fetchBoards(): Promise<void> {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      Alert.alert(`Error to get boards data`);
      console.log('Помилка fetchBoards:', error);
    }
  }
  const createBoard = async (newTitle: string, texture: string): Promise<boolean> => {
    const dataToSend: IBoard = { title: newTitle, custom: { background: texture } };
    try {
      const response = await postNewBoard(dataToSend);
      if (response === 'Created') {
        await fetchBoards();
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
        await fetchBoards();
      }
    } catch (error) {
      Alert.alert(`Error deleting board`);
    }
  };
  return { boards, createBoard, fetchBoards, deleteBoardById };
}
