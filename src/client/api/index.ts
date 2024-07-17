import config from '../../config.ts';
import handleFetch from './fetchHelper.ts';
import type { Coffee, Image } from '../../types.ts';

const SERVER_API_URL = `${config.SERVER_BASE}:${config.SERVER_PORT}/api`;

async function fetchData<T>(endpoint: string, isFirst: boolean): Promise<T> {
  const query = `?isFirst=${isFirst}`;
  const url = `${SERVER_API_URL}/${endpoint}${query}`;
  return handleFetch<T>(url);
}

export async function getCoffee(isFirst = false) {
  return fetchData<Coffee>('coffee', isFirst);
}

export async function getImage(isFirst = false) {
  return fetchData<Image>('image', isFirst);
}
