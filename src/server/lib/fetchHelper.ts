import fetch from 'node-fetch';

export default async function handleFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  const data = response.json();
  return data as Promise<T>;
}
