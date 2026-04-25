import { JSX } from 'react';
import { Button, View, Text, StyleSheet, Modal, Pressable } from 'react-native';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose(isActive: boolean): void;
  onConfirm(): void;
  message: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, message }: ConfirmModalProps): JSX.Element {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={() => onClose(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <View style={styles.buttonWrapper}>
              <Button title="Скасувати" color="#888" onPress={() => onClose(false)} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Видалити"
                color="#FF3B30"
                onPress={() => {
                  onConfirm();
                  onClose(false);
                }}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 26,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});
