import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoSensorFusionViewProps } from './ExpoSensorFusion.types';

const NativeView: React.ComponentType<ExpoSensorFusionViewProps> =
  requireNativeViewManager('ExpoSensorFusion');

export default function ExpoSensorFusionView(props: ExpoSensorFusionViewProps) {
  return <NativeView {...props} />;
}
