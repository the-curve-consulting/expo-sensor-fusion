import { Subscription } from 'expo-modules-core';

import { enhanceSubscriptionWithCleanup } from '../../libs/enhanceSubscriptionWithCleanup';

describe('enhanceSubscriptionWithCleanup', () => {
  const fakeSubscriptionRemoveFnSpy = jest.fn();

  let fakeSubscription: Subscription;

  beforeEach(() => {
    fakeSubscription = {
      remove: fakeSubscriptionRemoveFnSpy
    };
  });

  it('enhances the provided subscription and returns with the correct type', () => {
    const enhancedSubscription = enhanceSubscriptionWithCleanup(
      fakeSubscription,
      () => null
    );

    // Expect to only have the .remove attribute as a function.
    expect(enhancedSubscription).toEqual({
      remove: expect.any(Function)
    });
  });
});
