import { describe, it, expect, vi } from 'vitest';
import { createCache } from '../lib/cache';

describe('createCache', () => {
  it('should call the callback and cache the result', async () => {
    const callback = vi.fn().mockResolvedValue('test value');
    const getCached = createCache(callback);

    const promise1 = getCached(false);
    const promise2 = getCached(false);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result1).toBe('test value');
    expect(result2).toBe('test value');
  });

  it('should return cached last value when useLastValue is true', async () => {
    const callback = vi.fn().mockResolvedValue('test value');
    const getCached = createCache(callback);

    const result1 = await getCached(false);
    const result2 = await getCached(true);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result1).toBe('test value');
    expect(result2).toBe('test value');
  });

  it('should call the callback again after the cached promise is resolved', async () => {
    const callback = vi.fn().mockResolvedValue('test value');
    const getCached = createCache(callback);

    await getCached(false);

    const newCallback = vi.fn().mockResolvedValue('new value');
    const newCache = createCache(newCallback);

    const result = await newCache(false);

    expect(newCallback).toHaveBeenCalledTimes(1);
    expect(result).toBe('new value');
  });

  it('should handle the callback throwing an error', async () => {
    const error = new Error('test error');
    const callback = vi.fn().mockRejectedValue(error);
    const getCached = createCache(callback);

    await expect(getCached(false)).rejects.toThrow('test error');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback again after a failure', async () => {
    const error = new Error('test error');
    const callback = vi
      .fn()
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce('test value');
    const getCached = createCache(callback);

    await expect(getCached(false)).rejects.toThrow('test error');
    const result = await getCached(false);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(result).toBe('test value');
  });
});
