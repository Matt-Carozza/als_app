import { globalStyles } from '@/styles/globalStyles';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [selectedLightMode, setSelectedLightMode] = useState();

  return (
    <View style={globalStyles.screenContainer} >
      <Text style={globalStyles.label}>Select Light Mode:</Text>
      <Picker
        selectedValue={selectedLightMode}
        onValueChange={(itemValue, itemIndex) => setSelectedLightMode(itemValue)}
        style={globalStyles.picker}
      >
        <Picker.Item label="White Light" value="cl" />
        <Picker.Item label="Colored Light" value="wl" />
      </Picker>
    </View>
  );
}
