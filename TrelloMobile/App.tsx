import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BoardCard } from './src/components/BoardCard';
import { COLORS, globalStyles } from './src/styles/globalStyles';
import React, { useState } from 'react';
import { AddBoardModal } from './src/components/AddBoradModal';

export default function App() {
  const [boards, setBoards] = useState([
    { id: '1', title: 'My First Board', lists: 0, cards: 0 }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const addNewBoard = (title: string) => {
    const newBoard = {
      id: Date.now().toString(),
      title,
      lists: 0,
      cards: 0,
    };
    setBoards([...boards, newBoard]);
  };
  const handlePress = (boardName: string) => {
    console.log(`Pressed board: ${boardName}`);
  };

  return (
    <SafeAreaProvider style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trello Mobile (v.0.1)</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BoardCard title={item.title} listCount={item.lists} cardCount={item.cards} onPress={() => { }} />
        )}
        contentContainerStyle={{ padding: 15 }}
      />
      <AddBoardModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addNewBoard}
      />
      {/* <ScrollView contentContainerStyle={styles.scrollContent}>
        <BoardCard
          title="Project: Trello Mobile"
          listCount={3}
          cardCount={12}
          onPress={() => handlePress('Trello Mobile')}
        />
        <BoardCard
          title="Learning React Native"
          listCount={1}
          cardCount={5}
          onPress={() => handlePress('Learning RN')}
        />
      </ScrollView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    padding: 15,
  },
  addBtn: { backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 10 },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold'}
});
