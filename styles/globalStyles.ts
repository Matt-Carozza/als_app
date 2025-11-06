import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function useGlobalStyles() {
  const theme = useColorScheme() ?? 'light';
  const palette = Colors[theme];

  const switchTheme = {
    trackColor: { false: palette.secondaryLight, true: palette.secondaryLight },
    thumbColor: palette.secondary,
  };
  
  return {
    ...StyleSheet.create({
      tabBar: {
        backgroundColor: palette.background,
        borderTopWidth: 0,
        height: 60,
      },
      screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: palette.background,
      },
      heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: palette.secondary,
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
      deviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      buttonWithLabelsContainer: {
        alignItems: 'center', 
        marginTop: 20,
        marginBottom: 20 
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        height: '50%',
        width: '75%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
      },
      confirmButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#04AA6D',
        padding: 10,
        width: '100%',
      },
      deviceOptionButton: {
        backgroundColor: '#2295f2',
        bottom: 20,
        padding: 10,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
    }),
    // Plain object properties for theme-specific styles
    switchTheme,
  };
}