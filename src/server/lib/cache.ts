/**
 * Creates a cache for a given asynchronous callback function,
 * caching both the ongoing promise and the last resolved value.
 * @template T - The type of the value returned by the callback function.
 * @param {() => Promise<T>} callback - The asynchronous callback function to be cached.
 * @returns {(useLastValue: boolean) => Promise<T>} - A function to get the cached value or execute the callback.
 */
export function createCache<T>(
  callback: () => Promise<T>
): (useLastValue: boolean) => Promise<T> {
  // Cached promise to store the ongoing callback execution.
  let cachedPromise: Promise<T> | null = null;
  // Cached value to store the last resolved value.
  let cachedLastValue: T | null = null;

  /**
   * Gets the cached value or executes the callback to get a new value.
   * @param {boolean} useLastValue - Flag to indicate if the last cached value should be used.
   * @returns {Promise<T>} - The cached value or a new value from the callback.
   */
  return async function getCached(useLastValue = false): Promise<T> {
    // If useLastValue is true and there is a cached last value, return it.
    if (useLastValue && cachedLastValue) {
      return cachedLastValue;
    }

    // If there is an ongoing callback execution, return the cached promise.
    if (cachedPromise) {
      return cachedPromise;
    }

    cachedPromise = callback()
      .then((value: T) => {
        cachedLastValue = value;
        return value;
      })
      .finally(() => {
        cachedPromise = null;
      });

    return cachedPromise;
  };
}
