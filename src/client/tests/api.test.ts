import { describe, it, expect, vi } from 'vitest';
import { getCoffee, getImage } from '../api';

describe('Data Fetching', () => {
  it('should fetch coffee data', async () => {
    const mockResponse = { blendName: 'Test Blend' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await getCoffee();

    expect(data).toEqual(mockResponse);
  });

  it('should handle fetch coffee error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: () => Promise.resolve({ message: 'Not Found' }),
    });

    await expect(getCoffee()).rejects.toThrow('Not Found');
  });

  it('should fetch image data', async () => {
    const mockResponse = { file: 'image.jpg' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await getImage();

    expect(data).toEqual(mockResponse);
  });

  it('should handle fetch image error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: () => Promise.resolve({ message: 'Not Found' }),
    });

    await expect(getImage()).rejects.toThrow('Not Found');
  });
});
