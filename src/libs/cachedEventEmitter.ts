import { EventEmitter } from 'expo-modules-core';

import ExpoSensorFusionModule from '../ExpoSensorFusionModule';

/**
 * @private
 */
let eventEmitter: EventEmitter | undefined = undefined;

export const cachedEventEmitter = (): EventEmitter => {
  if (!eventEmitter) {
    eventEmitter = new EventEmitter(ExpoSensorFusionModule);
  }

  return eventEmitter;
};
