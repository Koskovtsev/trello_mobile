import React, { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/globalStyles';

interface BoardCardProps {
  title: string;
  listCount: number;
  onPress: () => void;
  onDelete: () => void;
}

export function BoardCard({ title, listCount, onPress, onDelete }: BoardCardProps): JSX.Element {
  return (
    <Pressable style={[styles.card, globalStyles.shadow]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Списків: {listCount}</Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FontAwesome name="trash" size={20} color="#991111" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    height: 150,
  },
  content: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: { color: COLORS.lightGray },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },
});
