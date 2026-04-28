import { JSX, useState } from 'react';
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { validateTitle } from '../../../common/validador';

interface ChangeTitleProps {
  currentTitle: string;
  onTitleChanged(newTitle: string): void;
  onCancel(): void;
}

export function ChangeTitle({ currentTitle, onTitleChanged, onCancel }: ChangeTitleProps): JSX.Element {
  const [title, setTitle] = useState(currentTitle);
  const [isError, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmitTitle(): Promise<void> {
    if (isSubmitting) return;
    if (title.trim() === currentTitle) {
      onCancel();
      return;
    }
    if (!isError) {
      setIsSubmitting(true);
      onTitleChanged(title);
    } else {
      onCancel();
    }
  }
  return (
    <>
      <Pressable style={styles.overlay} onPress={() => handleSubmitTitle()} />
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, isError && styles.errorInput]}
          value={title}
          onChangeText={(text) => {
            if (!validateTitle(text)) {
              setError(true);
            } else {
              setError(false);
            }
            setTitle(text);
          }}
          placeholder={!title ? 'Введіть назву...' : ''}
          autoFocus
          onBlur={() => !currentTitle && handleSubmitTitle()}
          onSubmitEditing={() => handleSubmitTitle()}
        />
        {isError && <Text style={styles.errorMessage}>Назва занадто коротка або введені недопустимі символи</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -2000,
    left: -1000,
    right: -1000,
    bottom: -2000,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  inputWrapper: {
    flex: 1,
    zIndex: 20,
  },
  input: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
    width: '100%',
    minWidth: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    padding: 0,
    textAlignVertical: 'center',
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: '#fff',
    fontSize: 10,
  },
});
