export async function fetchApiData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error("Неккоректные данные");
  }
}

export async function fetchLinkedObjects<T>(links: string[]): Promise<T[]> {
  try {
    const promises: Promise<T>[] = links.map((link) => fetchApiData(link));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    throw new Error("Неккоректные данные");
  }
}
