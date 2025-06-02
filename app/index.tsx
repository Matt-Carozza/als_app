import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [selectedLightMode, setSelectedLightMode] = useState();

  return (
    <View style={styles.container}>
      <Text>Select Light Mode:</Text>
      <Picker
        selectedValue={selectedLightMode}
        onValueChange={(itemValue, itemIndex) => setSelectedLightMode(itemValue)}
      >
        <Picker.Item label="White Light" value="cl" />
        <Picker.Item label="Colored Light" value="wl" />
      </Picker>
    </View>
  );
}
