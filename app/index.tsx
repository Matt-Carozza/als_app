import { globalStyles } from '@/styles/globalStyles';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export default function App() {
  const [selectedLightMode, setSelectedLightMode] = useState();
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  return (
    <View style={globalStyles.screenContainer} >
      <Text style={globalStyles.label}>Select Light Mode:</Text>
      <Picker
        selectedValue={selectedLightMode}
        onValueChange={(itemValue, itemIndex) => setSelectedLightMode(itemValue)}
        style={globalStyles.picker}
      >
        <Picker.Item label="White Light" value="wl" />
        <Picker.Item label="Colored Light" value="cl" />
      </Picker>
      {selectedLightMode === 'cl' && (
        <ColorPicker 
          color={selectedColor}
          onColorChangeComplete={color => setSelectedColor(color)}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
        />
      )}
    </View>
  );
}