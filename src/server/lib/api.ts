import type { Coffee, Image } from '../types.ts';
import { createCache } from './cache.ts';
import handleFetch from './fetchHelper.ts';

async function fetchRandomCoffee(): Promise<Coffee> {
  const url = 'https://random-data-api.com/api/coffee/random_coffee';
  return handleFetch<Coffee>(url);
}

async function fetchRandomImage(): Promise<Image> {
  const url = 'https://loremflickr.com/json/500/500/coffee,bean';
  return handleFetch<Image>(url);
}

export const getRandomCoffee = createCache<Coffee>(fetchRandomCoffee);
export const getRandomImage = createCache<Image>(fetchRandomImage);
