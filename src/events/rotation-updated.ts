import ExpoSensorFusionModule from '../ExpoSensorFusionModule';
import { enhanceSubscriptionWithCleanup } from '../libs/enhance-subscription-with-cleanup';
import { EventListener, RotationMatrix, Subscription } from '../types';

export const ROTATION_UPDATED_EVENT_NAME = 'onRotationUpdated';

export type RotationUpdatedEvent = {
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
  listener: EventListener<RotationUpdatedEvent>
): Subscription => {
  // Start observing rotation updates
  ExpoSensorFusionModule.startObservingRotationUpdates();

  // Add listener to the eventEmitter
  const subscription = ExpoSensorFusionModule.addListener(
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
