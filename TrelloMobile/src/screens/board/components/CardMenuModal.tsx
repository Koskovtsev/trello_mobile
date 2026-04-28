import { JSX, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { closeCardModal, openTextureModal } from '../../../store/uiSlice';
import { ChangeTitle } from '../changeTitle/ChangeTitle';
import { useCard } from './cardItem/hooks/useCard';
import { ICard } from '../../../common/interfaces/ICard';

export function CardMenuModal(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();
  const [isVisibleChangeTitle, setVisibleChangeTitile] = useState(true);
  const { isOpen, target } = useSelector((state: RootState) => state.ui.cardMenu);
  const board = useSelector((state: RootState) => state.boards.activeBoard);
  const list = board?.lists?.find((l) => l.id === target?.listId);
  const card = list?.cards?.find((c) => c.id === target?.cardId);
  useEffect(() => {
    if (isOpen) {
      setVisibleChangeTitile(true);
    }
  }, [isOpen]);
  const { handleSaveTitle } = useCard({
    boardId: board?.id ?? 0,
    listId: target?.listId ?? 0,
    cardData: card ?? ({} as ICard),
  });
  const { handleDeleteCard } = useCard({
    boardId: board?.id ?? 0,
    listId: target?.listId ?? 0,
    cardData: card ?? ({} as ICard),
  });
  if (!isOpen || !target || !board || !list || !card) return null;
  return (
    <Modal visible={isOpen} transparent>
      <Pressable
        style={styles.overlay}
        onPress={(e) => {
          dispatch(closeCardModal());
          e.stopPropagation();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.titleWrapper}>
            {isVisibleChangeTitle ? (
              <ChangeTitle
                currentTitle={card.title ?? ''}
                onTitleChanged={(title) => {
                  handleSaveTitle(title, setVisibleChangeTitile);
                }}
                onCancel={() => setVisibleChangeTitile(false)}
              />
            ) : (
              <Pressable onPress={() => setVisibleChangeTitile(true)} style={styles.titlePressArea}>
                <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                  {card.title}
                </Text>
              </Pressable>
            )}
          </View>
          <Pressable
            style={styles.actionRow}
            onPress={() => {
              dispatch(openTextureModal({ type: 'card', boardId: board.id!, listId: list.id ?? 0, cardId: card.id! }));
            }}
          >
            <Text style={styles.actionText}>Змінити текстуру</Text>
            <Image style={styles.iconImage} source={require('../../../../assets/color-picker-icon.png')} />
          </Pressable>
          <Pressable
            style={styles.actionRow}
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log(`delete card modal`);
              handleDeleteCard();
            }}
          >
            <Text style={[styles.actionText, styles.dangerText]}>Видалити</Text>
            <FontAwesome name="trash" size={20} color="#991111" />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    height: 50,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#727272',
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },

  titlePressArea: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
  },

  actionText: {
    fontSize: 16,
    color: '#fff',
  },

  dangerText: {
    color: '#ff4d4d',
  },

  iconImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
