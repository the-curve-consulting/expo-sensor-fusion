import type { CubeMapScreenName } from './CubeMapScreen';
import type { ExpoSensorFusionDebugScreenName } from './ExpoSensorFusionDebugScreen';
import type { HomeScreenName } from './HomeScreen';

export type AppScreen =
  | HomeScreenName
  | CubeMapScreenName
  | ExpoSensorFusionDebugScreenName;
