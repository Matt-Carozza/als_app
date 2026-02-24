import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

import AdaptiveLightingConfigScreen from '@/components/AdaptiveLightingConfigScreen';
import AdaptiveLightingGradient from '@/components/AdaptiveLightingGradient';
import ColorTemperatureSlider from '@/components/ColorTemperatureSlider';
import RainbowColorSlider from '@/components/RainbowColorSlider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { API_BASE_URL } from '@/constants/api';
import { disableAdaptiveLightingMode, enableAdaptiveLightingMode } from '@/services/homeApi';
import { connectSocket, subscribeAction } from '@/services/socket';
import { useGlobalStyles } from '@/styles/globalStyles';
import { dateToHHMM, HHMM } from '@shared/domain';
import { Switch } from 'react-native';

export default function App() {
  const [selectedLightMode, setSelectedLightMode] = useState('wl');  
  const [selectedRoom, setSelectedRoom] = useState(0);  
  const [wakeTime, setWakeTime]   = useState<HHMM>(
    dateToHHMM(new Date(0,0,0,7,30)) // Default to 7:30 AM
  );   
  const [sleepTime, setSleepTime] = useState<HHMM>(
    dateToHHMM(new Date(0,0,0,23,30)) // Default to 11:30 PM
  ); 
  const [statusPing, setStatusPing] = useState<boolean>(false);
  const [showAdaptiveLightingConfigScreen, setShowAdaptiveLightingConfigScreen] = useState<boolean>(false);
  const [isAdaptiveLightingEnabled, setIsAdaptiveLightingEnabled] = useState<boolean>(false);
  const toggleAdaptiveLightingSwitch = () => setIsAdaptiveLightingEnabled(previousState => !previousState);

  const styles = useGlobalStyles();
  const { switchTheme } = styles;

  const handleAdaptiveLightingChange = (modeEnabled: boolean) => {
    if (modeEnabled) {
      setShowAdaptiveLightingConfigScreen(true);
    } else {
      disableAdaptiveLightingMode(selectedRoom);
    }
    toggleAdaptiveLightingSwitch();
  };
  
  const handleAdaptiveLightingConfigClose = () => {
    setShowAdaptiveLightingConfigScreen(false);
    setIsAdaptiveLightingEnabled(false);
  };
  
  const handleAdaptiveLightingConfigSave = (wakeTime: HHMM, sleepTime: HHMM) => {
    setWakeTime(wakeTime);
    setSleepTime(sleepTime);
    enableAdaptiveLightingMode(selectedRoom, wakeTime, sleepTime);
    setShowAdaptiveLightingConfigScreen(false);
  };

  useEffect(() => {
    connectSocket(API_BASE_URL);
    const unsubscribe = subscribeAction('STATUS', event => {
        setStatusPing(true);
        setTimeout(() => setStatusPing(false), 200); // blink for 200ms
      }
    );
    
    return unsubscribe;
  }, []);

  return (
    <>
      <ThemedView style={styles.screenContainer}>
        <ThemedText style={styles.heading}>Select Light Mode:</ThemedText>
        {/* Status indicator */}
        <ThemedView
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: statusPing ? 'green' : 'red',
            marginBottom: 16,
          }}
        />
        <ThemedView style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedRoom}
            onValueChange={(itemValue, itemIndex) => setSelectedRoom(itemValue)}
          >
            <Picker.Item label="all" value={0} />
            <Picker.Item label="Room 1" value={1} />
            <Picker.Item label="Room 2" value={2} />
            <Picker.Item label="Room 3" value={4} />
            <Picker.Item label="Room 4" value={5} />
            <Picker.Item label="Room 5" value={6} />
          </Picker>
        </ThemedView>
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
            <RainbowColorSlider room_id={selectedRoom}/>
          </ThemedView>
        )}
        {selectedLightMode === 'wl' && (
          <ThemedView>
            {!isAdaptiveLightingEnabled && 
            <>
              <ThemedText style={styles.label}>Select Color Temperature:</ThemedText>
              <ColorTemperatureSlider room_id={selectedRoom}/>
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
        <ThemedText style={styles.label}>
          Adaptive Lighting Configuration
        </ThemedText>
      </AdaptiveLightingConfigScreen>
    </>
  );
}