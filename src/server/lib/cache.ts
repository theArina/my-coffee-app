export function createCache<T>(
  callback: () => Promise<T>
): (useLastValue: boolean) => Promise<T> {
  let cachedPromise: Promise<T> | null = null;
  let cachedLastValue: T | null = null;

  return async function getCached(useLastValue = false): Promise<T> {
    if (useLastValue && cachedLastValue) {
      return cachedLastValue;
    }

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
