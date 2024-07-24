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
}


export const fetchAllFiles = async (item: RepositoryItem): Promise<{ [key: string]: string }> => {
  let contents: { [key: string]: string } = {}

  const fetchFileContent = async (url: string): Promise<string> => {
    const response = await fetch(url)
    if (response.ok) {
      return await response.text()
    } else {
      throw new Error(`Failed to fetch file content from ${url}`)
    }
  }

  const fetchDirectoryContents = async (url: string): Promise<RepositoryItem[]> => {
    const response = await fetch(url)
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(`Failed to fetch directory contents from ${url}`)
    }
  }

  const traverse = async (item: RepositoryItem): Promise<void> => {
    if (item.type === 'file' && item.download_url) {
      contents[item.path] = await fetchFileContent(item.download_url)
    } else if (item.type === 'dir' && item.url) {
      const dirContents = await fetchDirectoryContents(item.url)
      for (const contentItem of dirContents) {
        await traverse(contentItem)
      }
    }
  }

  await traverse(item)
  return contents
}