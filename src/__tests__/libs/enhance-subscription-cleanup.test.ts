import { enhanceSubscriptionWithCleanup } from '../../libs/enhance-subscription-with-cleanup';
import { Subscription } from '../../types';

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
