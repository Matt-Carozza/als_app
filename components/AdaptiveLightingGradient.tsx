import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


type Props = PropsWithChildren<{
  wakeTime: Date;
  sleepTime: Date;
}>;

export default function AdaptiveLightingGradient({wakeTime, sleepTime}: Props) {

    return (
    <ThemedView style={styles.container}> 
      <ThemedText style={styles.topLeftLabel}>
        {wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </ThemedText>
      <ThemedText style={styles.topRightLabel}>
        {sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </ThemedText>
      <LinearGradient
        colors={['#fed260', '#fef6e5', '#cff0f8', '#fef6e5', '#fed260']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sliderContainer}
      />
        <ThemedText style={styles.bottomLeftLabel}>Lights On</ThemedText>
        <ThemedText style={styles.bottomRightLabel}>Lights Off</ThemedText>
    </ThemedView>
  );
}
// ADD LABEL THAT SAYS MID DAY OR SOMETHING LIKE THAT

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  topLeftLabel: {
    position: 'absolute',
    left: -10,
    top: -20,
    fontSize: 18,
    marginTop: 12,
  },
  topRightLabel: {
    position: 'absolute',
    right: -10,
    top: -20,
    fontSize: 18,
    marginTop: 12,
  },
  bottomLeftLabel: {
    position: 'absolute',
    right: -10,
    bottom: -20,
    fontSize: 18,
    marginBottom: 12,
  },
  bottomRightLabel: {
    position: 'absolute',
    left: -10,
    bottom: -20,
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
