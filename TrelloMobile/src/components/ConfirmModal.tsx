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
      {/* Pressable тут дозволяє закрити модалку, якщо клікнути "мимо" вікна */}
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
                color="#FF3B30" // Гарний червоний колір (iOS style)
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Напівпрозорий чорний фон
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
    // Тіні для iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Тіні для Android
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

//     <Modal visible={isOpen} transparent animationType="fade">
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>Видалити цю дошку?</Text>
//           <View style={styles.modalButtons}>
//             <Button title="Скасувати" onPress={() => onClose(false)} />
//             <Button
//               title={message}
//               color="red"
//               onPress={() => {
//                 onConfirm();
//                 onClose(false);
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalOverlay: { backgroundColor: '#fff' },
//   modalContent: {},
//   modalText: {},
//   modalButtons: {},
// });
