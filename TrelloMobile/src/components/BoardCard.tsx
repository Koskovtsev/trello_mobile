import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, globalStyles } from "../styles/globalStyles";

interface BoardCardProps {
  title: string;
  listCount: number;
  cardCount: number;
  onPress: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ title, listCount, cardCount, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, globalStyles.shadow]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{`${listCount} lists • ${cardCount} cards`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginTop: 5,
  },
});