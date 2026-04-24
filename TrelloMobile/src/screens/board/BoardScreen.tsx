import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { JSX, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchBoardThunk } from '../../store/boardsSlice';
import { useBoard } from './hooks/useBoard';
import { ChangeTitle } from './changeTitle/ChangeTitle';

export type RootStackParamList = {
  Home: undefined;
  Board: { boardId: number };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Board'>;

export function BoardScreen({ route }: Props): JSX.Element {
  const { boardId } = route.params || { boardId: 'Unknown' };
  const dispatch = useDispatch<AppDispatch>();
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(false);
  const { activeBoard } = useSelector((state: RootState) => state.boards);
  useEffect(() => {
    dispatch(fetchBoardThunk(boardId));
  }, [dispatch, boardId]);
  if (!activeBoard) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  const { handleSaveTitle } = useBoard({ boardId });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isVisibleChangeTitle ? (
          <Pressable onPress={() => setVisibleChangeTitile(true)} style={styles.titleWrapper}>
            <Text style={styles.headerText}>{activeBoard.title}</Text>
          </Pressable>
        ) : (
          <ChangeTitle
            currentTitle={activeBoard.title}
            onTitleChanged={(title) => handleSaveTitle(title, setVisibleChangeTitile)}
            onCancel={() => setVisibleChangeTitile(false)}
          />
        )}
      </View>
      <View style={styles.main}>
        <Text style={{ fontSize: 18 }}>Ви на дошці з ID:{boardId}!</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{activeBoard.title}</Text>
        <Text>Списків на цій дошці: {activeBoard.lists?.length || 0}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#282828',
    height: 60,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  titleWrapper: { flexDirection: 'row', alignItems: 'flex-start' },
  headerText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },

  main: { backgroundColor: '#444', flex: 1, width: '100%', padding: 10 },
});
