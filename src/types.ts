import { NativeModule } from 'expo';

import { ROTATION_UPDATED_EVENT_NAME, RotationUpdatedEvent } from './events/rotation-updated';

type ExpoSensorFusionModuleEvents = {
  [ROTATION_UPDATED_EVENT_NAME]: (event: RotationUpdatedEvent) => void
};

export declare class ExpoSensorFusionModule extends NativeModule<ExpoSensorFusionModuleEvents> {
  /**
   * Checks whether or not the rotation sensor is available on the current device.
   *
   * @returns `true` if the rotation sensor is available, otherwise `false`.
   */
  isSensorAvailable: () => boolean;

  /**
   * Begin listening for rotation updates.
   */
  startObservingRotationUpdates: () => void;

  /**
   * Stop listening for rotation updates.
   */
  stopObservingRotationUpdates: () => void;
}

/**
 * Listener function for {@link E} update events.
 */
export type EventListener<E> = (event: E) => void;

/**
 * The matrix representing a rotation.
 */
export type RotationMatrix = {
  m11: number;
  m12: number;
  m13: number;
  m21: number;
  m22: number;
  m23: number;
  m31: number;
  m32: number;
  m33: number;
};

export type Subscription = {
  /**
   * A method to unsubscribe the listener.
   */
  remove: () => void;
};
