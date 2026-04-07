import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

import AdaptiveLightingConfigScreen from '@/components/AdaptiveLightingConfigScreen';
import AdaptiveLightingGradient from '@/components/AdaptiveLightingGradient';
import ColorTemperatureSlider from '@/components/ColorTemperatureSlider';
import RainbowColorSlider from '@/components/RainbowColorSlider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { API_BASE_URL } from '@/constants/api';
import { disableAdaptiveLightingMode, enableAdaptiveLightingMode, sendOffDelay } from '@/services/homeApi';
import { connectSocket, subscribeAction } from '@/services/socket';
import { useGlobalStyles } from '@/styles/globalStyles';
import { dateToHHMM, getConfigMode, HHMM, rgbToColorTemp } from '@shared/domain';
import { Switch } from 'react-native';
import { RoomStatePayload } from '../../packages/events/src/events';

type RoomSettings = {
  selectedLightMode: 'wl' | 'cl';
  hue: number;
  colorTemp: number;
  wakeTime: HHMM;
  sleepTime: HHMM;
  isAdaptiveLightingEnabled: boolean;
};

const defaultSettings: RoomSettings = {
  selectedLightMode: 'wl',
  hue: 0,
  colorTemp: 4000,
  wakeTime: dateToHHMM(new Date(0,0,0,7,30)),
  sleepTime: dateToHHMM(new Date(0,0,0,23,30)),
  isAdaptiveLightingEnabled: false,
};

function rgbToHue(r: number, g: number, b: number): number {
  // Normalize values to 0-1
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const delta = max - min;

  let h = 0;

  if (delta === 0) {
    h = 0;
  } else if (max === R) {
    h = 60 * (((G - B) / delta) % 6);
  } else if (max === G) {
    h = 60 * (((B - R) / delta) + 2);
  } else if (max === B) {
    h = 60 * (((R - G) / delta) + 4);
  }

  // Ensure hue is positive (0-360)
  return (h + 360) % 360;
}

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(1);  
  const [offDelay, setOffDelay] = useState(1);  

  const [roomConfigs, setRoomConfigs] = useState<Record<number, RoomSettings>>({
    1: { ...defaultSettings },
    2: { ...defaultSettings },
  });
  const currentRoomData = roomConfigs[selectedRoom] || defaultSettings;

  const [showAdaptiveLightingConfigScreen, setShowAdaptiveLightingConfigScreen] = useState<boolean>(false);
  const updateRoomSetting = (roomId: number, updates: Partial<RoomSettings>) => {
    setRoomConfigs(prev => ({
      ...prev,
      [roomId]: {
        ...(prev[roomId] || defaultSettings),
        ...updates
      }
    }));
  }

  const toggleAdaptiveLightingSwitch = () => {
    updateRoomSetting(selectedRoom, { 
      isAdaptiveLightingEnabled: !currentRoomData.isAdaptiveLightingEnabled 
    });
  };

  const setHueFromRGB = (r: number, g: number, b: number) => {
    updateRoomSetting(selectedRoom, {
      hue: rgbToHue(r, g, b)
    });
  };

  const setSelectedLightMode = (light_mode: 'wl' | 'cl') => {
    updateRoomSetting(selectedRoom, { 
      selectedLightMode: light_mode
    });
  };

  const setIsAdaptiveLightingEnabled = (alm_enabled: boolean) => {
    updateRoomSetting(selectedRoom, { 
      isAdaptiveLightingEnabled: alm_enabled
    });
  };

  const setWakeTime = (wake_time: HHMM) => {
    updateRoomSetting(selectedRoom, {
      wakeTime: wake_time
    });
  };

  const setSleepTime = (sleep_time: HHMM) => {
    updateRoomSetting(selectedRoom, {
      sleepTime: sleep_time
    });
  };

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
  
  const handleAdaptiveLightingConfigSave = (wake_time: HHMM, sleep_time: HHMM) => {
    setWakeTime(wake_time);
    setSleepTime(sleep_time);
    const current_time: HHMM = dateToHHMM(new Date());
    enableAdaptiveLightingMode(selectedRoom, 
                               wake_time, 
                               sleep_time, 
                               current_time);
    setShowAdaptiveLightingConfigScreen(false);
  };
  
  const handleOffDelayDropDownValueChange = (off_delay: number) => {
    setOffDelay(off_delay);
    sendOffDelay(selectedRoom, off_delay * 60)
  }

  useEffect(() => {
    connectSocket(API_BASE_URL);
    const unsubscribe = subscribeAction('GET_MAIN_STATE', event => {
        
        const { rooms } = event.payload as { rooms: RoomStatePayload[] };
        setRoomConfigs((prev) => {
          const updatedConfigs = { ...prev };
          rooms.forEach((room) => {
            const mode = room.alm_enabled ? 'wl' : getConfigMode(room.r, room.g, room.b);
            const colorTempValue = rgbToColorTemp(room.r, room.g, room.b) ?? defaultSettings.colorTemp;
            const hueValue = rgbToHue(room.r, room.g, room.b)
            updatedConfigs[room.room_id] = {
              // Keep existing values if room was already in state
              ...(prev[room.room_id] || defaultSettings), 

              // Update with fresh data from websocket
              isAdaptiveLightingEnabled: room.alm_enabled,
              // Only update times if they are provided in the JSON
              ...(room.wake_time && { wakeTime: room.wake_time }),
              ...(room.sleep_time && { sleepTime: room.sleep_time }),
              
              selectedLightMode: mode,
              hue: hueValue,
              colorTemp: colorTempValue
            };
          });
          return updatedConfigs;
        });
      }
    );
    
    return unsubscribe;
  }, []);

  return (
    <>
      <ThemedView style={styles.screenContainer}>
        <ThemedText style={styles.heading}>Room:</ThemedText>
        <ThemedView style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedRoom}
            onValueChange={(itemValue, itemIndex) => setSelectedRoom(itemValue)}
          >
            <Picker.Item label="Room 1" value={1} />
            <Picker.Item label="Room 2" value={2} />
          </Picker>
        </ThemedView>
        {!currentRoomData.isAdaptiveLightingEnabled && (
          <>
          <ThemedText style={styles.heading}>Config Mode:</ThemedText>
          <ThemedView style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={currentRoomData.selectedLightMode}
              onValueChange={(itemValue, itemIndex) => setSelectedLightMode(itemValue)}
            >
              <Picker.Item label="White Light" value="wl" />
              <Picker.Item label="Colored Light" value="cl" />
            </Picker>
          </ThemedView>
          </>
        )}
        {currentRoomData.selectedLightMode === 'cl' && (
          <ThemedView>
            <ThemedText style={styles.heading}>Select Color:</ThemedText>
            <RainbowColorSlider 
            room_id={selectedRoom}
            hue={currentRoomData.hue}
            />
          </ThemedView>
        )}
        {currentRoomData.selectedLightMode === 'wl' && (
          <ThemedView>
            {!currentRoomData.isAdaptiveLightingEnabled && 
            <>
              <ThemedText style={styles.heading}>Select Color Temperature:</ThemedText>
              <ColorTemperatureSlider room_id={selectedRoom} color_temp={currentRoomData.colorTemp}/>
            </>
            }
            <ThemedView style={styles.switchContainer}>
            <ThemedText style={styles.label}>Adaptive Lighting Mode</ThemedText>
            <Switch
              trackColor={switchTheme.trackColor}
              thumbColor={switchTheme.thumbColor}
              ios_backgroundColor={switchTheme.trackColor.false}
              onValueChange={handleAdaptiveLightingChange}
              value={currentRoomData.isAdaptiveLightingEnabled}
              style={{ marginLeft: 8 }}
            />
            </ThemedView>
            {currentRoomData.isAdaptiveLightingEnabled && (
            <>
              <AdaptiveLightingGradient 
                wakeTime={currentRoomData.wakeTime}
                sleepTime={currentRoomData.sleepTime} 
              />
            </>
            )}   
          </ThemedView>
        )}
        <ThemedText style={styles.heading}>Occupancy Sensor Off Delay:</ThemedText>
        <ThemedView style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={offDelay}
            onValueChange={(itemValue, itemIndex) => handleOffDelayDropDownValueChange(itemValue)}
          >
            <Picker.Item label="1 Minute" value={1} />
            <Picker.Item label="5 Minutes" value={5} />
            <Picker.Item label="15 Minutes" value={15} />
            <Picker.Item label="30 Minutes" value={30} />
            <Picker.Item label="45 Minutes" value={45} />
            <Picker.Item label="60 Minutes" value={60} />
          </Picker>
        </ThemedView>
      </ThemedView>

      <AdaptiveLightingConfigScreen
        isVisible={showAdaptiveLightingConfigScreen}
        wakeTime={currentRoomData.wakeTime}
        sleepTime={currentRoomData.sleepTime}
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