import * as React from 'react';

import { ExpoSensorFusionViewProps } from './ExpoSensorFusion.types';

export default function ExpoSensorFusionView(props: ExpoSensorFusionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
