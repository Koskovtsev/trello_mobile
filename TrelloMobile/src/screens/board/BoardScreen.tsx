import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useBoard } from './hooks/useBoard';
import { ChangeTitle } from './changeTitle/ChangeTitle';
import { ListItem } from './components/ListItem/ListItem';
import { getBoardLayout } from './utils/boardLayout';
import { fetchBoardThunk } from '../../store/boards/thunks';
import { AddList } from './components/ListItem/AddList';
import { ConfirmModal } from '../../components/ConfirmModal';
import { IList } from '../../common/interfaces/IList';

export type RootStackParamList = {
  Home: undefined;
  Board: { boardId: number };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Board'>;

export function BoardScreen({ route }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { itemWidth, gap, sidePadding } = getBoardLayout(SCREEN_WIDTH);
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(false);
  const [deletingList, setDeletingList] = useState<IList | null>(null);
  const { boardId } = route.params;
  const { activeBoard } = useSelector((state: RootState) => state.boards);
  const { handleSaveTitle } = useBoard({ boardId });
  const { deleteListById } = useBoard({ boardId });
  const lists = activeBoard?.lists ?? [];
  const snapOffsets = useMemo(() => lists.map((_, index) => index * (itemWidth + gap)), [lists.length, itemWidth, gap]);

  useEffect(() => {
    dispatch(fetchBoardThunk(boardId));
  }, [dispatch, boardId]);

  if (!activeBoard) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <FlatList
            style={styles.listsWrapper}
            data={activeBoard.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapOffsets}
            snapToAlignment="center"
            snapToInterval={itemWidth + gap}
            disableIntervalMomentum
            decelerationRate="fast"
            ListFooterComponent={<AddList width={itemWidth} boardId={boardId} />}
            ListFooterComponentStyle={{ marginRight: -sidePadding / 2 }}
            contentContainerStyle={{ paddingHorizontal: sidePadding }}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ListItem
                listItem={item}
                boardId={boardId}
                onDeleteList={(list) => setDeletingList(list)}
                width={itemWidth}
                marginRight={gap}
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
      <ConfirmModal
        isOpen={!!deletingList}
        onClose={() => setDeletingList(null)}
        onConfirm={() => {
          deleteListById(deletingList!);
          setDeletingList(null);
        }}
        message={`Видалити список "${deletingList?.title}"?`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  activityIndicator: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#aaa',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 55,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  titleWrapper: {
    flex: 1,
  },
  headerText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  listsWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
});
