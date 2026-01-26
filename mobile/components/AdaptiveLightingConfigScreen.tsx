import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { PropsWithChildren, useState } from 'react';
import { Button, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';


type Props = PropsWithChildren<{
  isVisible: boolean;
  wakeTime: Date;
  sleepTime: Date;
  onClosePressed: () => void;
  onConfirmPressed: (wakeTime: Date, sleepTime: Date) => void;
}>;

export default function AdaptiveLightingConfigScreen({ isVisible, wakeTime, sleepTime, children, onClosePressed, onConfirmPressed }: Props) {
  const [localWakeTime, setLocalWakeTime] = useState<Date>(wakeTime || new Date());
  const [localSleepTime, setLocalSleepTime] = useState<Date>(sleepTime || new Date());
  const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);
  const [showSleepTimePicker, setShowSleepTimePicker] = useState(false);

  React.useEffect(() => {
    if (isVisible) {
      setLocalWakeTime(wakeTime || new Date(7, 0)); // Default to 7:00 AM if no wakeTime provided
      setLocalSleepTime(sleepTime || new Date(11, 0)); // Default to 11:00 PM if no sleepTime provided
    }
  }, [isVisible, wakeTime, sleepTime]);

  const onChangeWakeTime = (event: any, selectedDate: Date | undefined) => {
    setShowWakeTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setLocalWakeTime(selectedDate);
    }
  };

  const onChangeSleepTime = (event: any, selectedDate: Date | undefined) => {
    setShowSleepTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setLocalSleepTime(selectedDate);
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <TouchableOpacity onPress={onClosePressed}>
              <MaterialIcons name="close" color="#fff" size={40} />
            </TouchableOpacity>
            <ThemedText style={styles.label}>Wake Up Time</ThemedText>
            <Button title={localWakeTime.toLocaleTimeString()} onPress={() => setShowWakeTimePicker(true)} />
            {showWakeTimePicker && (
              <DateTimePicker
                value={localWakeTime}
                mode="time"
                is24Hour={false}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeWakeTime}
              />
            )}
            <ThemedText style={styles.label}>Sleep Time</ThemedText>
            <Button title={localSleepTime.toLocaleTimeString()} onPress={() => setShowSleepTimePicker(true)} />
            {showSleepTimePicker && (
              <DateTimePicker
                value={localSleepTime}
                mode="time"
                is24Hour={false}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeSleepTime}
              />
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={() => onConfirmPressed(localWakeTime, localSleepTime)}>
              <ThemedText style={{ color: '#fff', textAlign: 'center' }}>Save</ThemedText>
            </TouchableOpacity>
            {children}
          </ThemedView>
        </View>
      </Modal>
    </View>
  );

}

const styles = StyleSheet.create({
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
  label: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
