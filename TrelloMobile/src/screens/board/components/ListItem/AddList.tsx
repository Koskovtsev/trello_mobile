import { JSX, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Text, StyleSheet, View, Alert } from 'react-native';
import { AppDispatch, RootState } from '../../../../store/store';
import { ChangeTitle } from '../../changeTitle/ChangeTitle';
import { IList } from '../../../../common/interfaces/IList';
import { createListThunk, fetchBoardThunk } from '../../../../store/boards/thunks';

export function AddList({ width, boardId }: { width: number; boardId: number }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { activeBoard } = useSelector((state: RootState) => state.boards);
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(false);
  const [title, setTitle] = useState('');
  const handleCreateList = async (): Promise<void> => {
    if (!title || !activeBoard) return;
    const listPosition: number = (activeBoard?.lists?.length ?? 0) + 1;
    const newList: IList = { title, position: listPosition };
    try {
      const payload = {
        boardId,
        listData: newList,
      };
      await dispatch(createListThunk(payload)).unwrap();
      await dispatch(fetchBoardThunk(boardId)).unwrap();
    } catch (error) {
      Alert.alert('Error adds new list');
    } finally {
      setVisibleChangeTitile(false);
      setTitle('');
    }
  };
  return (
    <View style={styles.container}>
      {isVisibleChangeTitle && (
        <>
          <View style={styles.listTitle}>
            <ChangeTitle currentTitle="" onTitleChanged={setTitle} onCancel={() => setVisibleChangeTitile(false)} />
          </View>
          <Pressable
            style={[styles.addListButton, { width }]}
            onPress={() => {
              handleCreateList();
            }}
          >
            <Text style={styles.addListText}>Додати список</Text>
          </Pressable>
        </>
      )}
      {!isVisibleChangeTitle && (
        <Pressable style={[styles.openAddForm, { width }]} onPress={() => setVisibleChangeTitile(true)}>
          <Text style={styles.addListText}>+ Додати ще один список</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    height: '90%',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  addListButton: {
    marginTop: 10,
    height: 40,
    width: '100%',
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 930,
  },
  listTitle: {
    height: 40,
  },
  openAddForm: {
    height: 50,
    backgroundColor: '#444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addListText: {
    height: 20,
  },
});
