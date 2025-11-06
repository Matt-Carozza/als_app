import RoomLabel from '@/components/RoomLabel';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalStyles } from '@/styles/globalStyles';
import React, { useState } from 'react';
import { Button } from 'react-native';

// TODO: Add button here to "Add room", then in each room, be able to add devices
// This might not be user functionality, but just to see the logic of how to add devices
export default function DevicesScreen() {
  const styles = useGlobalStyles();
  const [rooms, setRooms] = useState<string[]>([]);
  const handleAddRoom = () => {
    setRooms([...rooms, `Room ${rooms.length + 1}`]);
  }
  const handleRemoveRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
  }
  return (
    <ThemedView style={styles.screenContainer}>
      <Button title="Add Room" onPress={handleAddRoom} />
      {rooms.map((room, index) => (
        <RoomLabel key={index} roomName={room} />
      ))}
      <Button title="Remove Last Room" onPress={() => handleRemoveRoom(rooms.length - 1)} />
    </ThemedView>
  );
}