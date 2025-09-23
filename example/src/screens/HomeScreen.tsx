import { ExpoSensorFusion } from '@the-curve-consulting/expo-sensor-fusion';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import type { AppScreen } from './types';
import { Button } from '../lib/components/Button';

export type HomeScreenName = 'HomeScreen';

type HomeScreenProps = {
  navigateTo: (screen: AppScreen) => void;
};

export const HomeScreen = ({ navigateTo }: HomeScreenProps) => {
  const [sensorAvailable, setSensorAvailable] = useState(false);

  useEffect(() => {
    setSensorAvailable(ExpoSensorFusion.isSensorAvailable());
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FDF0D5'
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: 'center',
          gap: 12,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 42,
            marginBottom: 24,
            paddingHorizontal: 24
          }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          ExpoSensorFusion
        </Text>

        {!sensorAvailable ? (
          <View
            style={{
              borderRadius: 12,
              backgroundColor: '#f34f4f',
              padding: 12,
              marginBottom: 24
            }}
          >
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold'
              }}
            >
              This device does not support the rotations sensors required by
              this application.
            </Text>
          </View>
        ) : null}

        <Button
          disabled={!sensorAvailable}
          onPress={() => navigateTo('CubeMapScreen')}
        >
          <Text style={{ color: '#FBB13C' }}>Example:</Text> Cubemap
        </Button>

        <Button
          disabled={!sensorAvailable}
          onPress={() => navigateTo('ExpoSensorFusionDebugScreen')}
        >
          <Text style={{ color: '#FBB13C' }}>Debug:</Text> Raw sensor values
        </Button>
      </View>
    </SafeAreaView>
  );
};
