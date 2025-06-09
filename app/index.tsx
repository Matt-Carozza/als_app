import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

import ColorTemperatureSlider from '@/components/ColorTemperatureSlider';
import RainbowColorSlider from '@/components/RainbowColorSlider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalStyles } from '@/styles/globalStyles';

export default function App() {
  const [selectedLightMode, setSelectedLightMode] = useState('wl');
  const styles = useGlobalStyles();

  return (
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
          <ThemedText style={styles.label}>Select Color Temperature:</ThemedText>
          <ColorTemperatureSlider />
        </ThemedView>
      )}
    </ThemedView>
  );
}