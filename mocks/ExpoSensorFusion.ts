import { Subscription } from "../src/types"

export let fakeRegisteredEvents: { id: number, eventName: string, listener: Function }[] = [];

export const addListener = jest.fn().mockImplementation((eventName: string, listener: Function): Subscription => {
    const thisEventId = fakeRegisteredEvents.length + 1;
    fakeRegisteredEvents.push({
        id: thisEventId,
        eventName,
        listener
    })

    return {
        remove: jest.fn().mockImplementation(() => {
            fakeRegisteredEvents = fakeRegisteredEvents.filter((event) => event.id !== thisEventId)
        })
    }
});

export const removeListeners = jest.fn().mockImplementation(() => fakeRegisteredEvents = [])

export const startObservingRotationUpdates = jest.fn()

export const stopObservingRotationUpdates = jest.fn()

export const emit = jest.fn().mockImplementation((eventName: string, listenerArguments: any) => {
    fakeRegisteredEvents.forEach((event) => {
        if (event.eventName !== eventName) {
            // Not an event we're emitting. Skip and do nothing.
            return
        }

        // Call the event listener
        event.listener?.(listenerArguments);
    })
});

export const reset = () => {
    fakeRegisteredEvents = []
}