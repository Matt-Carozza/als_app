import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalStyles } from '@/styles/globalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { PropsWithChildren, useState } from 'react';
import { Button, Modal, Platform, TouchableOpacity, View } from 'react-native';


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
  
  const styles = useGlobalStyles();

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
              <ThemedText style={styles.buttonText}>Save</ThemedText>
            </TouchableOpacity>
            {children}
          </ThemedView>
        </View>
      </Modal>
    </View>
  );

}
