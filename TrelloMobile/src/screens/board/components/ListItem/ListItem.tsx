import { JSX, memo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IList } from '../../../../common/interfaces/IList';
import { ChangeTitle } from '../../changeTitle/ChangeTitle';
import { useList } from './hooks/useList';
import { CardItem } from '../cardItem/CardItem';
import { RootState } from '../../../../store/store';
import { openTextureModal } from '../../../../store/uiSlice';
import { textures } from '../TexturePickerModal';

interface ListItemProps {
  listItem: IList;
  boardId: number;
  width: number;
  marginRight: number;
  onDeleteList(deleteListItem: IList): void;
}

function ListItemComponent({ listItem, boardId, onDeleteList, width, marginRight }: ListItemProps): JSX.Element {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(false);
  const [isVisibleAddCardForm, setVisibleAddCardForm] = useState(false);
  const { activeBoard } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch();
  const currentTexture = textures.find(
    (textere) =>
      textere.name === (activeBoard?.custom?.listTextures ? activeBoard?.custom?.listTextures[listItem.id ?? 0] : 'car')
  );
  const flatListRef = useRef<FlatList>(null);
  const { handleSaveTitle } = useList({ boardId, listData: listItem });
  const { handleAddCard } = useList({ boardId, listData: listItem });
  return (
    <View style={[styles.listContainer, { width, marginRight }]}>
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={currentTexture?.source}
          style={[styles.backgroundImage, { height: SCREEN_HEIGHT }]}
          resizeMode="cover"
        />
        <View style={{ ...StyleSheet.absoluteFillObject }} />
      </View>
      <View style={styles.listWrapper}>
        <View style={styles.header}>
          {!isVisibleChangeTitle ? (
            <Pressable onPress={() => setVisibleChangeTitile(true)} style={styles.titlePressArea}>
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
          <View style={styles.texturesButtonWrapper}>
            <Pressable
              style={styles.changeTexturesButton}
              onPress={() => dispatch(openTextureModal({ type: 'list', boardId, listId: listItem.id! }))}
            >
              <Image style={styles.iconImage} source={require('../../../../../assets/color-picker-icon.png')} />
            </Pressable>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            ref={flatListRef}
            data={listItem.cards}
            style={styles.cardsWrapper}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => {
              if (isVisibleAddCardForm) {
                flatListRef.current?.scrollToEnd({ animated: true }); // геміні
              }
            }}
            onLayout={() => {
              if (isVisibleAddCardForm) {
                flatListRef.current?.scrollToEnd({ animated: true }); // геміні
              }
            }}
            ListFooterComponent={
              isVisibleAddCardForm ? (
                <View
                  style={styles.inputWrapper}
                  onLayout={() => {
                    setTimeout(() => {
                      flatListRef.current?.scrollToEnd({ animated: true });
                    }, 50);
                  }}
                >
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
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  backgroundImage: { width: '100%' },
  listWrapper: { flex: 1, zIndex: 1 },
  header: {
    justifyContent: 'space-between',
    borderBottomColor: '#bbb',
    flexDirection: 'row',
    borderBottomWidth: 2,
    minHeight: 45,
    paddingBottom: 5,
  },
  titlePressArea: {
    flex: 1,
  },
  changeTexturesButton: {
    height: 35,
    width: 35,
  },
  body: {
    flex: 1,
  },
  texturesButtonWrapper: {
    width: 38,
    height: 38,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
