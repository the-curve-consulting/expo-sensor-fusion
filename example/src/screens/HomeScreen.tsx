import { SafeAreaView, Text } from 'react-native';

import type { AppScreen } from './types';
import { Button } from '../lib/components/Button';

export type HomeScreenName = 'HomeScreen';

type HomeScreenProps = {
  navigateTo: (screen: AppScreen) => void;
};

export const HomeScreen = ({ navigateTo }: HomeScreenProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FDF0D5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 42,
          marginBottom: 48,
          paddingHorizontal: 24
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        ExpoSensorFusion
      </Text>

      <Button
        style={{ marginBottom: 12 }}
        onPress={() => navigateTo('CubeMapScreen')}
      >
        <Text style={{ color: '#FBB13C' }}>Example:</Text> Cubemap
      </Button>

      <Button onPress={() => navigateTo('ExpoSensorFusionDebugScreen')}>
        <Text style={{ color: '#FBB13C' }}>Debug:</Text> Raw values values
      </Button>
    </SafeAreaView>
  );
};
