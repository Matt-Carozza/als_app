// styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#e4e4e4',
  secondary: '#7d1d2a',
  textDark: '#1a1a1a',
  textLight: '#ffffff',
  border: '#cccccc',
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.textLight,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.textDark,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 6,
  },
});
