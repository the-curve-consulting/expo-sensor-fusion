/**
 * Mock the native module for all tests.
 */
jest.mock('../ExpoSensorFusionModule.ts', () => ({
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  startObservingRotationUpdates: jest.fn(),
  stopObservingRotationUpdates: jest.fn()
}));
