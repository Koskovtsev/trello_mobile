import { JSX } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ICard } from '../../../../common/interfaces/ICard';
import { useCard } from './hooks/useCard';

interface CardItemProps {
  boardId: number;
  listId: number;
  cardItem: ICard;
}

export function CardItem({ boardId, listId, cardItem }: CardItemProps): JSX.Element {
  const isChecked = !!cardItem.custom?.isChecked;
  const { changeChekedStatus } = useCard({ boardId, listId, cardData: cardItem });
  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.checkButton}
        onPress={() => {
          changeChekedStatus(!isChecked);
        }}
      >
        <View style={styles.row}>
          <View style={[styles.checkbox, isChecked && styles.checked]}>
            {isChecked && <FontAwesome name="check-circle" size={20} color="green" />}
          </View>
          <Text style={styles.title} numberOfLines={10} ellipsizeMode="tail">
            {cardItem.title}
          </Text>
        </View>
      </Pressable>
      <View style={styles.menuContainer}>
        <Pressable
          style={styles.cardMenuButton}
          onPress={() => {
            // eslint-disable-next-line prettier/prettier, no-console
            console.log(`натиснуто меню картки`);
          }}
        >
          <FontAwesome name="pencil" size={28} color="#000" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 35,
    padding: 5,
    backgroundColor: '#777',
    borderRadius: 5,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  checkButton: {
    alignContent: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: 8,
    borderRadius: 10,
  },
  checked: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    flexShrink: 1,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  cardMenuButton: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
});
