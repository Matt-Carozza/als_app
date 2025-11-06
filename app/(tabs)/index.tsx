import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import AdaptiveLightingConfigScreen from '@/components/AdaptiveLightingConfigScreen';
import AdaptiveLightingGradient from '@/components/AdaptiveLightingGradient';
import ColorTemperatureSlider from '@/components/ColorTemperatureSlider';
import RainbowColorSlider from '@/components/RainbowColorSlider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalStyles } from '@/styles/globalStyles';
import { Switch } from 'react-native';

export default function App() {
  // TODO: Dimmer functionality
  const [selectedLightMode, setSelectedLightMode] = useState('wl');  
  const [wakeTime, setWakeTime] = useState(new Date(7,30)); // Default to 7:30 AM
  const [sleepTime, setSleepTime] = useState(new Date(11,30)); // Default to 11:30 PM
  const [showAdaptiveLightingConfigScreen, setShowAdaptiveLightingConfigScreen] = useState<boolean>(false);
  const [isAdaptiveLightingEnabled, setIsAdaptiveLightingEnabled] = useState<boolean>(false);
  const toggleAdaptiveLightingSwitch = () => setIsAdaptiveLightingEnabled(previousState => !previousState);

  const styles = useGlobalStyles();
  const { switchTheme } = styles;

  const handleAdaptiveLightingChange = (modeEnabled: boolean) => {
    if (modeEnabled) {
      setShowAdaptiveLightingConfigScreen(true);
    }
    toggleAdaptiveLightingSwitch();
  };
  
  const handleAdaptiveLightingConfigClose = () => {
    setShowAdaptiveLightingConfigScreen(false);
    setIsAdaptiveLightingEnabled(false);
  };
  
  const handleAdaptiveLightingConfigSave = (wakeTime: Date, sleepTime: Date) => {
    setWakeTime(wakeTime);
    setSleepTime(sleepTime);
    setShowAdaptiveLightingConfigScreen(false);
  };

  return (
    <>
      <ThemedView style={styles.screenContainer}>
        <ThemedText style={styles.heading}>Select Light Mode:</ThemedText>
        <ThemedView style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedLightMode}
            onValueChange={(itemValue, itemIndex) => setSelectedLightMode(itemValue)}
          >
            <Picker.Item label="White Light" value="wl" />
            <Picker.Item label="Colored Light" value="cl" />
          </Picker>
        </ThemedView>
        {selectedLightMode === 'cl' && (
          <ThemedView>
            <ThemedText style={styles.label}>Select Color:</ThemedText>
            <RainbowColorSlider />
          </ThemedView>
        )}
        {selectedLightMode === 'wl' && (
          <ThemedView>
            {!isAdaptiveLightingEnabled && 
            <>
              <ThemedText style={styles.label}>Select Color Temperature:</ThemedText>
              <ColorTemperatureSlider />
            </>
            }
            <ThemedView style={styles.switchContainer}>
            <ThemedText style={styles.label}>Adaptive Lighting Mode</ThemedText>
            <Switch
              trackColor={switchTheme.trackColor}
              thumbColor={switchTheme.thumbColor}
              ios_backgroundColor={switchTheme.trackColor.false}
              onValueChange={handleAdaptiveLightingChange}
              value={isAdaptiveLightingEnabled}
              style={{ marginLeft: 8 }}
            />
            </ThemedView>
            {isAdaptiveLightingEnabled && (
            <>
              <AdaptiveLightingGradient 
                wakeTime={wakeTime}
                sleepTime={sleepTime} 
              />
            </>
            )}   
          </ThemedView>
        )}
      </ThemedView>

      <AdaptiveLightingConfigScreen
        isVisible={showAdaptiveLightingConfigScreen}
        wakeTime={wakeTime}
        sleepTime={sleepTime}
        onClosePressed={handleAdaptiveLightingConfigClose}
        onConfirmPressed={handleAdaptiveLightingConfigSave}
      >
      </AdaptiveLightingConfigScreen>
    </>
  );
}