import { JSX, memo, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { IList } from '../../../../common/interfaces/IList';
import { ChangeTitle } from '../../changeTitle/ChangeTitle';
import { useList } from './hooks/useList';
import { CardItem } from '../cardItem/CardItem';
import { RootState } from '../../../../store/store';

interface ListItemProps {
  listItem: IList;
  boardId: number;
  width: number;
  marginRight: number;
  onDeleteList(deleteListItem: IList): void;
}

function ListItemComponent({ listItem, boardId, onDeleteList, width, marginRight }: ListItemProps): JSX.Element {
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(false);
  const [isVisibleAddCardForm, setVisibleAddCardForm] = useState(false);
  const { activeBoard } = useSelector((state: RootState) => state.boards);
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    if (!isVisibleAddCardForm) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
  }, [isVisibleAddCardForm]);
  const { handleSaveTitle } = useList({ boardId, listData: listItem });
  const { handleAddCard } = useList({ boardId, listData: listItem });
  return (
    <View style={[styles.listContainer, { width, marginRight }]}>
      <View style={styles.header}>
        {!isVisibleChangeTitle ? (
          <Pressable onPress={() => setVisibleChangeTitile(true)} style={styles.titleWrapper}>
            <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
              {listItem.title}
            </Text>
          </Pressable>
        ) : (
          <ChangeTitle
            currentTitle={listItem.title ?? ''}
            onTitleChanged={(title) => handleSaveTitle(title, setVisibleChangeTitile)}
            onCancel={() => setVisibleChangeTitile(false)}
          />
        )}
      </View>
      <View style={styles.body}>
        <FlatList
          ref={flatListRef}
          data={listItem.cards}
          style={styles.cardsWrapper}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            isVisibleAddCardForm ? (
              <View style={styles.inputWrapper}>
                <ChangeTitle
                  currentTitle=""
                  onTitleChanged={(title) => {
                    const pos = (activeBoard?.lists?.find((list) => list.id === listItem.id)?.cards?.length ?? 0) + 1;
                    handleAddCard(title, pos, setVisibleAddCardForm);
                  }}
                  onCancel={() => setVisibleAddCardForm(false)}
                />
              </View>
            ) : null
          }
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardItem cardItem={item} boardId={boardId} listId={listItem.id ?? 0} />}
        />
      </View>
      <View style={styles.footer}>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            setVisibleAddCardForm(true);
          }}
          style={styles.addCardButton}
        >
          <Text style={styles.addCardTitle}>+ Додати картку</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            onDeleteList(listItem);
          }}
          style={styles.delCardButton}
        >
          <FontAwesome name="trash" size={20} color="#991111" />
        </Pressable>
      </View>
    </View>
  );
}

export const ListItem = memo(ListItemComponent);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#333',
    height: '90%',
    marginRight: 0,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  header: {
    justifyContent: 'flex-start',
    borderBottomColor: '#bbb',
    borderBottomWidth: 2,
    minHeight: 45,
    paddingBottom: 5,
  },
  body: {
    flex: 1,
  },
  titleWrapper: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  cardsWrapper: {
    flex: 1,
    paddingTop: 5,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addCardButton: {
    margin: 5,
    height: 40,
    width: 120,
    backgroundColor: '#444',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardTitle: {},
  inputWrapper: {
    height: 40,
    margin: 5,
  },
  delCardButton: {
    marginRight: 10,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
