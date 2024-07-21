import { RepositoryItem } from "@/types/github";

export const fetchRepoContents = async (url: string): Promise<RepositoryItem[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch repository contents');
  }
  const items: RepositoryItem[] = await response.json();

  const fetchContents = items.map(async (item) => {
    if (item.type === 'dir') {
      const subItems = await fetchRepoContents(item.url);
      return { ...item, content: subItems };
    }
    return { ...item, content: null };
  });

  return Promise.all(fetchContents);
};