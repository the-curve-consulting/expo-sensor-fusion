import ExpoSensorFusionModule from '../ExpoSensorFusionModule';
import { cachedEventEmitter } from '../libs/cachedEventEmitter';
import { enhanceSubscriptionWithCleanup } from '../libs/enhanceSubscriptionWithCleanup';
import { EventListener, RotationMatrix, Subscription } from '../types';

const ROTATION_UPDATED_EVENT_NAME = 'rotationUpdated';

export type RotationUpdateEvent = {
  rotationMatrix: RotationMatrix;
};

/**
 * Checks whether or not the rotation sensor is available on the current device.
 *
 * @returns `true` if the rotation sensor is available, otherwise `false`.
 */
export const isSensorAvailable = (): boolean => {
  return ExpoSensorFusionModule.isSensorAvailable();
};

/**
 * Adds a listener for rotation update events.
 *
 * @param listener - The event listener function.
 * @returns A subscription object for removing the listener.
 */
export const addRotationUpdateListener = (
  listener: EventListener<RotationUpdateEvent>
): Subscription => {
  // Start observing rotation updates
  ExpoSensorFusionModule.startObservingRotationUpdates();

  // Add listener to the eventEmitter
  const subscription = cachedEventEmitter().addListener<RotationUpdateEvent>(
    ROTATION_UPDATED_EVENT_NAME,
    listener
  );

  const enhancedSubscription = enhanceSubscriptionWithCleanup(
    subscription,
    () => {
      // Stop observing rotation updates
      ExpoSensorFusionModule.stopObservingRotationUpdates();
    }
  );

  return enhancedSubscription;
};
