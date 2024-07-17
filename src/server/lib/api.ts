import fetch from 'node-fetch';
import { createCache } from './cache.ts';
import type { Coffee, Image } from '../types.ts';

export const getRandomCoffee = createCache<Coffee>(fetchRandomCoffee);
export const getRandomImage = createCache<Image>(fetchRandomImage);

async function fetchRandomCoffee(): Promise<Coffee> {
  const response = await fetch(
    'https://random-data-api.com/api/coffee/random_coffee'
  );
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const data = await response.json();
    return data as Coffee;
  } else if (contentType?.includes('text/plain')) {
    const data = await response.text();
    throw new Error(`Response text: "${data.toString()}"`);
  } else {
    throw new Error(`Unknown response content type: ${contentType}`);
  }
}

async function fetchRandomImage(): Promise<Image> {
  const response = await fetch(
    'https://loremflickr.com/json/500/500/coffee,bean'
  );
  const data = await response.json();
  return data as Image;
}
