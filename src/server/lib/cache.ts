export function createCache<T>(callback: () => Promise<T>): () => Promise<T> {
  let cachedPromise: Promise<unknown> | null = null;

  return async function getCached(): Promise<T> {
    if (cachedPromise) {
      return cachedPromise as Promise<T>;
    }

    cachedPromise = callback()
      .then((value: T) => {
        return value;
      })
      .finally(() => {
        cachedPromise = null;
      });

    return cachedPromise as Promise<T>;
  };
}
