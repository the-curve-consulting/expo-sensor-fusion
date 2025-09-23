import { useState } from 'react';
import { Text } from 'react-native';

import { CubeMapScreen } from './src/screens/CubeMapScreen';
import { ExpoSensorFusionDebugScreen } from './src/screens/ExpoSensorFusionDebugScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { AppScreen } from './src/screens/types';

export const App = () => {
  const [screen, setScreen] = useState<AppScreen>('HomeScreen');

  const navigateTo = (screen: AppScreen) => {
    setScreen(screen);
  };

  switch (screen) {
    case 'HomeScreen':
      return <HomeScreen navigateTo={navigateTo} />;

    case 'CubeMapScreen':
      return <CubeMapScreen onBack={() => setScreen('HomeScreen')} />;

    case 'ExpoSensorFusionDebugScreen':
      return (
        <ExpoSensorFusionDebugScreen onBack={() => setScreen('HomeScreen')} />
      );

    default:
      return <Text>No screen available. Restart the app.</Text>;
  }
};

export default App;