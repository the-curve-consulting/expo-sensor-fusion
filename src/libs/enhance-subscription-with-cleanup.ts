import { Subscription } from '../types';

/**
 * Enhances a {@link Subscription} object with additional {@link cleanupCallback} function to run after the
 * {@link Subscription#remove} operation.
 *
 * @param subscription - The event emitter subscription reference.
 * @param cleanupCallback - Additional callback after {@link Subscription#remove} is called on {@link subscription}.
 * @returns an enhanced Subscription with the same API as the normal {@link Subscription}.
 */
export const enhanceSubscriptionWithCleanup = (
  subscription: Subscription,
  cleanupCallback: () => void
): Subscription => {
  return {
    remove() {
      subscription.remove();
      cleanupCallback();
    }
  };
};
