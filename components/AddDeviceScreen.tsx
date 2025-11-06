import { ThemedView } from '@/components/ThemedView';
import { useGlobalStyles } from '@/styles/globalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { PropsWithChildren } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClosePressed: () => void;
  onDeviceOptionPressed: (deviceOption: string) => void;
}>;

export default function AddDeviceScreen({isVisible, onClosePressed, onDeviceOptionPressed}: Props) {
  const styles = useGlobalStyles();    
  interface DeviceOption {
    [device: string]: string;
  }

  const deviceOptions: DeviceOption = { 
    lightBulb: "Light Bulb",
    lightStrip: "Light Strip",
    daylightSensor: "Daylight Sensor",
    occupancySensor: "Occupancy Sensor"
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <TouchableOpacity onPress={onClosePressed}>
              <MaterialIcons name="close" color="#fff" size={40} />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.deviceOptionButton} 
            onPress={() => onDeviceOptionPressed(deviceOptions["lightBulb"])}
            >
              <ThemedText 
              style={styles.buttonText}>{deviceOptions["lightBulb"]}
              </ThemedText> 
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.deviceOptionButton} 
            onPress={() => onDeviceOptionPressed(deviceOptions["lightStrip"])}
            >
              <ThemedText 
              style={styles.buttonText}>{deviceOptions["lightStrip"]}
              </ThemedText> 
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.deviceOptionButton} 
            onPress={() => onDeviceOptionPressed(deviceOptions["daylightSensor"])}
            >
              <ThemedText 
              style={styles.buttonText}>{deviceOptions["daylightSensor"]}
              </ThemedText> 
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.deviceOptionButton} 
            onPress={() => onDeviceOptionPressed(deviceOptions["occupancySensor"])}
            >
              <ThemedText 
              style={styles.buttonText}>{deviceOptions["occupancySensor"]}
              </ThemedText> 
            </TouchableOpacity>
          </ThemedView>
        </View>
      </Modal>
    </View>
  );
}