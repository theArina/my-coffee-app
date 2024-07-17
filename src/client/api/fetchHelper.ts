export default async function handleFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  const data = response.json();
  return data as Promise<T>;
}
