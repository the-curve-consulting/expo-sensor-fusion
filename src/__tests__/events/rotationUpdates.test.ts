import ExpoSensorFusionModule from '../../ExpoSensorFusionModule';
import {
  RotationUpdateEvent,
  addRotationUpdateListener
} from '../../events/rotationUpdates';
import { cachedEventEmitter } from '../../libs/cachedEventEmitter';

describe('rotationUpdates', () => {
  let mockListener: jest.Mock;

  beforeEach(() => {
    mockListener = jest.fn();
  });

  describe('addRotationUpdateListener', () => {
    it('can add a listener for "rotationUpdated" events', () => {
      const subscription = addRotationUpdateListener(mockListener);

      expect(subscription).toEqual({
        remove: expect.any(Function)
      });

      // Sets a listener
      expect(
        ExpoSensorFusionModule.startObservingRotationUpdates
      ).toHaveBeenCalledTimes(1);
      expect(ExpoSensorFusionModule.addListener).toHaveBeenNthCalledWith(
        1,
        'rotationUpdated'
      );
    });

    it('can remove the listener for "rotationUpdated" events', () => {
      const subscription = addRotationUpdateListener(mockListener);
      subscription.remove();

      expect(
        ExpoSensorFusionModule.stopObservingRotationUpdates
      ).toHaveBeenCalledTimes(1);
      expect(ExpoSensorFusionModule.removeListeners).toHaveBeenNthCalledWith(
        1, // is called one time
        1 // with 1 as its argument
      );
    });

    it('receives the correct "rotationUpdate" events when being listened to and can unsubscribe', () => {
      const subscription = addRotationUpdateListener(mockListener);

      // Does not get called when no event is emitted.
      expect(mockListener).not.toHaveBeenCalled();

      // Simulate an event emitted from the native-side
      const mockRotationUpdateEvent: RotationUpdateEvent = {
        rotationMatrix: {
          m11: 1, m12: 2, m13: 3, // eslint-disable-line prettier/prettier
          m21: 4, m22: 5, m23: 6, // eslint-disable-line prettier/prettier
          m31: 7, m32: 8, m33: 9, // eslint-disable-line prettier/prettier
        }
      };
      cachedEventEmitter().emit('rotationUpdated', mockRotationUpdateEvent);
      cachedEventEmitter().emit('rotationUpdated', mockRotationUpdateEvent);
      // Gets called when an event is emitted.
      expect(mockListener).toHaveBeenNthCalledWith(2, mockRotationUpdateEvent);

      // Reset the number of times this mock have been called, so that we can assert
      // that it does not get called again on the next check after unsubscribing.
      mockListener.mockClear();
      // Unsubscribe and ensure that no event is listened regardless of it being emitted for some reason.
      subscription.remove();
      cachedEventEmitter().emit('rotationUpdated', mockRotationUpdateEvent);
      cachedEventEmitter().emit('rotationUpdated', mockRotationUpdateEvent);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });
});
