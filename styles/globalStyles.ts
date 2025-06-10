import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useGlobalStyles() {
  const theme = useColorScheme() ?? 'light';
  const palette = Colors[theme];

  return StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: palette.background,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: palette.tint,
      marginBottom: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: palette.icon,
      borderRadius: 8,
      backgroundColor: palette.background,
      marginVertical: 10,
    },
    picker: {
      height: 50,
      width: '100%',
      backgroundColor: palette.background,
      color: palette.text,
    },
    label: {
      fontSize: 16,
      color: palette.text,
      marginBottom: 6,
    },
  });
}