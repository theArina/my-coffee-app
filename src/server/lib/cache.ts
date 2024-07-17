export function createCache<T>(callback: () => Promise<T>): () => Promise<T> {
  let cachedPromise: Promise<T> | null = null;

  return async function getCached(): Promise<T> {
    if (cachedPromise) {
      return cachedPromise
    }

    cachedPromise = callback()
      .then((value: T) => {
        return value;
      })
      .finally(() => {
        cachedPromise = null;
      });

    return cachedPromise
  };
}
