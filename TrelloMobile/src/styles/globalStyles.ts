import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#0079bf',
  background: '#f4f5f7',
  text: '#172b4d',
  white: '#ffffff',
  gray: '#ddd',
  lightGray: '#e0e0e0',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});