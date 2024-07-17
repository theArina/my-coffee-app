import fetch from 'node-fetch';
import { createCache } from './cache.ts';
import type { Coffee, Image } from '../types.ts';

export const getRandomCoffee = createCache<Coffee>(fetchRandomCoffee);
export const getRandomImage = createCache<Image>(fetchRandomImage);

async function fetchRandomCoffee(): Promise<Coffee> {
  const response = await fetch(
    'https://random-data-api.com/api/coffee/random_coffee'
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  const data = await response.json();
  return data as Coffee;
}

async function fetchRandomImage(): Promise<Image> {
  const response = await fetch(
    'https://loremflickr.com/json/500/500/coffee,bean'
  );
  const data = await response.json();
  return data as Image;
}
