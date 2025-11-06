import { Colors } from "@/constants/Colors";
import { useGlobalStyles } from "@/styles/globalStyles";
import React, { useState } from 'react';
import { Button } from "react-native";
import AddDeviceScreen from "./AddDeviceScreen";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function RoomLabel({ roomName }: { roomName: string }) {
  const styles = useGlobalStyles();
  // TODO: Add modal for device selection (might need to be in parent component)
  const [devices, setDevices] = useState<string[]>([]);
  const [showDeviceScreen, setShowDeviceScreen] = useState<boolean>(false);

  const handleAddDevicePressed = () => {
    setShowDeviceScreen(true); 
  }

  const handleDeviceSelected = (deviceOption: string) => {
    setShowDeviceScreen(false);
    setDevices([...devices, deviceOption]); 
  }
  
  const handleRemoveDevicePressed = (index: number) => {
    setDevices(devices.filter((_, i) => i !== index));
  }


  
  const onClosePressed = () => {
    setShowDeviceScreen(false); 
  }

  return (
    <ThemedView style={styles.buttonWithLabelsContainer}>
        <ThemedText style={styles.label}>{roomName}</ThemedText> 
        {devices.map((device, index) => (
          <ThemedView style={styles.deviceContainer} key={index}>
          <ThemedText key={index} style={styles.label}>- {device}</ThemedText>
          <Button
            title="Remove Device"
            onPress={() => handleRemoveDevicePressed(index)}
            color={Colors.light.secondary}
          />
          </ThemedView>
        ))}
        <Button 
          title="Add Device" 
          onPress={handleAddDevicePressed}
          color = {Colors.light.secondary}
        /> 
        <AddDeviceScreen
          isVisible={showDeviceScreen}
          onClosePressed={onClosePressed}
          onDeviceOptionPressed={handleDeviceSelected}
        />
    </ThemedView>
  );
}