import React, { JSX } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { textures } from '../screens/board/components/TexturePickerModal';

interface BoardCardProps {
  title: string;
  texture: string;
  onPress: () => void;
  onDelete: () => void;
}

export function BoardCard({ title, texture, onPress, onDelete }: BoardCardProps): JSX.Element {
  const currentTexture = textures.find((t) => t.name === (texture ?? 'gray'));
  return (
    <Pressable style={[styles.card, globalStyles.shadow]} onPress={onPress}>
      <Image style={styles.boardPreview} source={currentTexture?.source} />
      <View style={styles.footer}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FontAwesome name="trash" size={20} color={COLORS.darkRed} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    height: 150,
    overflow: 'hidden',
  },
  boardPreview: {
    width: '100%',
    height: 110,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: { flex: 1 },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },
});
