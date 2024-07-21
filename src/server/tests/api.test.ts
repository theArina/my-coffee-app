import { describe, it, expect, vi } from 'vitest';
import * as api from '../lib/api';
import { Coffee, Image } from '../../types.js';

describe('API lib', () => {
  it('should return a random coffee', async () => {
    const mockResponse = { blendName: 'Test Blend' } as Awaited<
      Promise<Coffee>
    >;
    vi.spyOn(api, 'getRandomCoffee').mockResolvedValue(mockResponse);

    const response = await api.getRandomCoffee(false);

    expect(response).toEqual(mockResponse);
  });

  it('should return a random image', async () => {
    const mockResponse = { file: 'image.jpg' } as Awaited<Promise<Image>>;
    vi.spyOn(api, 'getRandomImage').mockResolvedValue(mockResponse);

    const response = await api.getRandomImage(false);

    expect(response).toEqual(mockResponse);
  });
});
