import { FontAwesome } from '@expo/vector-icons';
import { JSX } from 'react';
import { FlatList, ImageBackground, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { applyTexture } from '../../../store/uiThunks';
import { closeTextureModal } from '../../../store/uiSlice';

export const textures = [
  { id: 1, name: 'yellow', source: require('../../../../assets/textur_yellow.jpg') },
  { id: 2, name: 'pink_', source: require('../../../../assets/textur_pink.jpg') },
  { id: 3, name: 'orange', source: require('../../../../assets/textur_orange.jpg') },
  { id: 4, name: 'green', source: require('../../../../assets/textur_green.jpg') },
  { id: 5, name: 'blue', source: require('../../../../assets/textur_blue.jpg') },
  { id: 6, name: 'purple', source: require('../../../../assets/textur_purple.jpg') },
  { id: 7, name: 'gray', source: require('../../../../assets/textur_gray.jpg') },
  { id: 8, name: 'black', source: require('../../../../assets/textur_black.jpg') },
  { id: 9, name: 'lakes', source: require('../../../../assets/textur_lakes.jpg') },
  { id: 10, name: 'car', source: require('../../../../assets/textur_car.jpg') },
  { id: 11, name: 'mountains', source: require('../../../../assets/textur_mountains.jpg') },
  { id: 12, name: 'nature', source: require('../../../../assets/textur_nature.jpg') },
];
export function TexturePickerModal(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, target } = useSelector((state: RootState) => state.ui.textureModal);
  const board = useSelector((state: RootState) => state.boards.activeBoard);
  if (!isOpen || !target || !board) return null;

  let currentTextureName: string | undefined;

  switch (target.type) {
    case 'list':
      currentTextureName = board.custom?.listTextures?.[target.listId];
      break;

    case 'card': {
      const list = board.lists?.find((l) => l.id === target.listId);
      const card = list?.cards?.find((c) => c.id === target.cardId);
      currentTextureName = card?.custom?.background;
      break;
    }

    case 'board':
      currentTextureName = board.custom?.background;
      break;
    default:
      break;
  }

  const currentTextureId = textures.find((texture) => texture.name === currentTextureName)?.id;

  const handleTexturePick = (texture: string): void => {
    dispatch(applyTexture(texture));
    dispatch(closeTextureModal());
  };
  return (
    <Modal visible={isOpen} animationType="fade" transparent onRequestClose={() => dispatch(closeTextureModal())}>
      <Pressable style={styles.overlay} onPress={() => dispatch(closeTextureModal())}>
        <View style={styles.modalContainer}>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={textures}
            numColumns={3}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleTexturePick(item.name)} style={styles.boxWrapper}>
                <ImageBackground source={item.source} style={styles.textureBox}>
                  {currentTextureId === item.id && (
                    <View style={styles.selectedOverlay}>
                      <FontAwesome name="check" size={30} color="black" />
                    </View>
                  )}
                </ImageBackground>
              </Pressable>
            )}
          />
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
  modalContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
  listContent: {
    alignItems: 'center',
  },
  boxWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textureBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
