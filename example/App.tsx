import { StyleSheet, Text, View } from 'react-native';

import * as ExpoSensorFusion from 'expo-sensor-fusion';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoSensorFusion.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
