import React, { JSX, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBoards } from '../../hooks/useBoards';
import { BoardCard } from '../../components/BoardCard';
import { AddBoardModal } from '../../components/AddBoardModal';
import { COLORS, globalStyles } from '../../styles/globalStyles';
import { AppDispatch } from '../../store/store';
import { ConfirmModal } from '../../components/ConfirmModal';
import { IBoard } from '../../common/interfaces/IBoard';
import { fetchAllBoardsThunk } from '../../store/boards/thunks';

export type RootStackParamList = {
  Home: undefined;
  Board: { boardId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): JSX.Element {
  const { boards, createBoard } = useBoards();
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingBoard, setDeletingBoard] = useState<IBoard | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { deleteBoardById } = useBoards();
  useEffect(() => {
    dispatch(fetchAllBoardsThunk());
  }, [dispatch]);

  const handleAddBoard = async (title: string): Promise<void> => {
    const success = await createBoard(title, '');
    if (success) setModalVisible(false);
  };
  const onRefresh = (): void => {
    dispatch(fetchAllBoardsThunk());
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={boards}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <BoardCard
            title={item.title}
            texture={item.custom?.background ?? ''}
            onDelete={() => setDeletingBoard(item)}
            onPress={() => navigation.navigate('Board', { boardId: item.id ?? 0 })}
          />
        )}
        contentContainerStyle={styles.boardsList}
        onRefresh={onRefresh}
        refreshing={false}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Додати дошку</Text>
        </TouchableOpacity>
      </View>

      <AddBoardModal isVisible={modalVisible} onClose={() => setModalVisible(false)} onAdd={handleAddBoard} />
      <ConfirmModal
        isOpen={!!deletingBoard}
        onClose={() => setDeletingBoard(null)}
        onConfirm={() => {
          deleteBoardById(deletingBoard!.id ?? 0);
          setDeletingBoard(null);
        }}
        message={`Видалити дошку "${deletingBoard?.title}"?`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  boardsList: { padding: 15 },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 240,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});
