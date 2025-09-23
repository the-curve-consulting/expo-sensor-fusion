import {
  addRotationUpdateListener,
  RotationUpdatedEvent
} from '../../events/rotation-updated';
import ExpoSensorFusionModule from '../../ExpoSensorFusionModule';

describe('rotation-updated', () => {
  let mockListener: jest.Mock;

  beforeEach(() => {
    mockListener = jest.fn();

    jest.clearAllMocks();
  });

  describe('addRotationUpdateListener', () => {
    it('can add a listener for "onRotationUpdated" events', () => {
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
        'onRotationUpdated',
        expect.any(Function)
      );
    });

    it('can remove the listener for "onRotationUpdated" events', () => {
      const subscription = addRotationUpdateListener(mockListener);
      subscription.remove();

      expect(
        ExpoSensorFusionModule.stopObservingRotationUpdates
      ).toHaveBeenCalledTimes(1);
    });

    it('receives the correct "rotationUpdate" events when being listened to and can unsubscribe', () => {
      const subscription = addRotationUpdateListener(mockListener);

      // Does not get called when no event is emitted.
      expect(mockListener).not.toHaveBeenCalled();

      // Simulate an event emitted from the native-side
      const mockRotationUpdatedEvent: RotationUpdatedEvent = {
        rotationMatrix: {
          m11: 1, m12: 2, m13: 3,
          m21: 4, m22: 5, m23: 6,
          m31: 7, m32: 8, m33: 9
        }
      };

      // Gets called when an event is emitted (including multiple times)
      ExpoSensorFusionModule.emit('onRotationUpdated', mockRotationUpdatedEvent);
      ExpoSensorFusionModule.emit('onRotationUpdated', mockRotationUpdatedEvent);
      expect(mockListener).toHaveBeenNthCalledWith(2, mockRotationUpdatedEvent);

      // Reset the number of times this mock have been called, so that we can assert
      // that it does not get called again on the next check after unsubscribing.
      mockListener.mockRestore();

      // Unsubscribe and ensure that no event is listened regardless of it being emitted for some reason.
      subscription.remove();

      ExpoSensorFusionModule.emit('onRotationUpdated', mockRotationUpdatedEvent);
      ExpoSensorFusionModule.emit('onRotationUpdated', mockRotationUpdatedEvent);
      expect(mockListener).not.toHaveBeenCalled();
    });
  });
});
