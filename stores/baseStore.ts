import { create } from 'zustand'
import { RepositoryItem } from '@/types/github'

// Define the shape of your store
interface BaseStoreState {
  repoUrl: string | null;
  setRepoUrl: (url: string) => void;
  resetRepoUrl: () => void;

  repoContents: RepositoryItem[] | null;
  setRepoContents: (contents: RepositoryItem[]) => void;
  resetRepoContents: () => void;
}

const useBaseStore = create<BaseStoreState>((set, get) => ({
  repoUrl: null,
  setRepoUrl: (url) => set({ repoUrl: url }),
  resetRepoUrl: () => set({ repoUrl: null }),

  repoContents: null,
  setRepoContents: (contents) => set({ repoContents: contents }),
  resetRepoContents: () => set({ repoContents: null }),
}));

export default useBaseStore;
