import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoSensorFusion.web.ts
// and on native platforms to ExpoSensorFusion.ts
import ExpoSensorFusionModule from './ExpoSensorFusionModule';
import ExpoSensorFusionView from './ExpoSensorFusionView';
import { ChangeEventPayload, ExpoSensorFusionViewProps } from './ExpoSensorFusion.types';

// Get the native constant value.
export const PI = ExpoSensorFusionModule.PI;

export function hello(): string {
  return ExpoSensorFusionModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoSensorFusionModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoSensorFusionModule ?? NativeModulesProxy.ExpoSensorFusion);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoSensorFusionView, ExpoSensorFusionViewProps, ChangeEventPayload };
