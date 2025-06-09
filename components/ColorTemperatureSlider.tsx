import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function ColorTempSlider() {
const [colorTemp, setColorTemp] = useState(4000); // Default to 4000K

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Selected Temp: {colorTemp}K</ThemedText>

      <ThemedView style={styles.sliderContainer}>
      <LinearGradient
        colors={['#FFD7B5', '#FFFCE6', '#E0F7FF']} // warm to cool
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <Slider
        style={styles.slider}
        minimumValue={2700}
        maximumValue={6500}
        step={100}
        value={colorTemp}
        onValueChange={setColorTemp}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="#ffffff"
      />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
