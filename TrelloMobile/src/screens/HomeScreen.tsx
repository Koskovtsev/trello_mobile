import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBoards } from '../hooks/useBoards';
import { BoardCard } from '../components/BoardCard';
import { AddBoardModal } from '../components/AddBoardModal';
import { COLORS, globalStyles } from '../styles/globalStyles';

export function HomeScreen() {
  const { boards, fetchBoards, createBoard } = useBoards();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAddBoard = async (title: string) => {
    const success = await createBoard(title, '');
    if (success) setModalVisible(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мої дошки</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={boards}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <BoardCard 
            title={item.title} 
            listCount={0} 
            cardCount={0} 
            onPress={() => console.log('Перехід на дошку:', item.id)} 
          />
        )}
        contentContainerStyle={{ padding: 15 }}
        onRefresh={fetchBoards}
        refreshing={false} 
      />

      <AddBoardModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddBoard}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  addBtn: { backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' }
});