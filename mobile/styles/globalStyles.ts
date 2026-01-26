import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useGlobalStyles() {
  const theme = useColorScheme() ?? 'light';
  const palette = Colors[theme];

  const switchTheme = {
    trackColor: { false: palette.secondaryLight, true: palette.secondaryLight },
    thumbColor: palette.secondary,
  };
  
  const closeButton = {
    "name": "close",
    color: palette.secondary,
    size: 50,
  };

  return {
    ...StyleSheet.create({
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
        fontSize: 20,
        color: palette.text,
        marginBottom: 6,
      },
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginTop: 15 ,
        marginBottom: 15 
      },
    }),
    // Plain object properties for theme-specific styles
    switchTheme,
    closeButton,
  };
}