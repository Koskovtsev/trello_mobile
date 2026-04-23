import { JSX, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { validateTitle } from '../../../common/validador';

interface ChangeTitleProps {
  currentTitle: string;
  onTitleChanged(newTitle: string): void;
  onCancel(): void;
}

export function ChangeTitle({ currentTitle, onTitleChanged, onCancel }: ChangeTitleProps): JSX.Element {
  const [title, setTitle] = useState(currentTitle);
  const [isError, setError] = useState(false);

  async function handleSubmitTitle(): Promise<void> {
    if (title.trim() === currentTitle) {
      onCancel();
      return;
    }
    if (!isError) {
      onTitleChanged(title);
    } else {
      onCancel();
    }
  }
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => {
          if (!validateTitle(text)) {
            setError(true);
          } else {
            setError(false);
          }
          setTitle(text);
        }}
        autoFocus
        onBlur={() => handleSubmitTitle()}
        onSubmitEditing={() => handleSubmitTitle()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: { flex: 1 },
  input: {
    color: '#fff',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    padding: 0,
  },
});
