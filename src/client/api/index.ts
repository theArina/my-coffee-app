import config from '../../config.ts';

const SERVER_API_URL = `${config.SERVER_BASE}:${config.SERVER_PORT}/api`;

export async function getCoffee() {
  const resCoffee = await fetch(`${SERVER_API_URL}/coffee`);
  if (!resCoffee.ok) throw new Error('Failed to fetch coffee data');
  const coffee = await resCoffee.json();
  return coffee;
}

export async function getImage() {
  const resImage = await fetch(`${SERVER_API_URL}/image`);
  if (!resImage.ok) throw new Error('Failed to fetch image data');
  const image = await resImage.json();
  return image;
}