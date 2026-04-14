import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sendRGB } from '@/services/homeApi';
import Slider from '@react-native-community/slider';
import { colorTempToRGB } from '@shared/domain';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

type ColorTemperatureSliderProps = {
  room_id: number;
  color_temp: number;
}

export default function ColorTemperatureSlider( {room_id, color_temp}: ColorTemperatureSliderProps ) {
  const [localColorTemp, setLocalColorTemp] = useState(color_temp); // Default to 4000K
  
  useEffect(() => {
    setLocalColorTemp(color_temp);
  }, [color_temp]);

  const handleColorTempChange = () => {
    const color = colorTempToRGB(localColorTemp);
    if (color) {
      const [r, g, b] = color;
      sendRGB(room_id, r, g, b).catch(console.error);
    } else {
      console.error("Kelvin value not found in table")
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Selected Temp: {localColorTemp}K</ThemedText>

      <ThemedView style={styles.sliderContainer}>
      <LinearGradient
        //colors={['#f39d23', '#fdcf15', '#fbf8fc', '#cde9f4', '#62c4e2']} // warm to cool
        colors={['#fdcf15', '#fbf8fc', '#cde9f4']} // warm to cool
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <Slider
        style={styles.slider}
        minimumValue={2000}
        maximumValue={6500}
        step={100}
        value={localColorTemp}
        onValueChange={setLocalColorTemp}
        onSlidingComplete={handleColorTempChange}
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
