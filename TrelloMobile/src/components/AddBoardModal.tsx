import React, { JSX, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles/globalStyles';

interface AddBoardModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export function AddBoardModal({ isVisible, onClose, onAdd }: AddBoardModalProps): JSX.Element {
  const [title, setTitle] = useState('');

  const handleAdd = (): void => {
    if (title.trim()) {
      onAdd(title);
      setTitle('');
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>New Board</Text>
          <TextInput style={styles.input} placeholder="Board title" value={title} onChangeText={setTitle} autoFocus />
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
              <Text style={styles.addText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    padding: 10,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: 10,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
