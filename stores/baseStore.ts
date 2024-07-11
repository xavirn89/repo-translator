import { create } from 'zustand'
import { RepositoryItem } from '@/types/github'
import { LanguageItem } from '@/types/languages'

// Define the shape of your store
interface BaseStoreState {
  repoUrl: string | null
  setRepoUrl: (url: string) => void
  resetRepoUrl: () => void

  repoContents: RepositoryItem[] | null
  setRepoContents: (contents: RepositoryItem[]) => void
  resetRepoContents: () => void

  selectedContents: RepositoryItem[]
  setSelectedContents: (contents: RepositoryItem[]) => void

  loading: boolean
  setLoading: (loading: boolean) => void

  allFilesContent: { [key: string]: string }
  setAllFilesContent: (contents: { [key: string]: string }) => void

  repositoryLanguage: LanguageItem | null
  setRepositoryLanguage: (language: LanguageItem) => void
  resetRepositoryLanguage: () => void

  translationLanguages: LanguageItem[]
  setTranslationLanguages: (languages: LanguageItem[]) => void
  addTranslationLanguage: (language: LanguageItem) => void
  removeTranslationLanguage: (code: string) => void
}

const useBaseStore = create<BaseStoreState>((set, get) => ({
  repoUrl: null,
  setRepoUrl: (url) => set({ repoUrl: url }),
  resetRepoUrl: () => set({ repoUrl: null }),

  repoContents: null,
  setRepoContents: (contents) => set({ repoContents: contents }),
  resetRepoContents: () => set({ repoContents: null }),

  selectedContents: [],
  setSelectedContents: (contents) => set({ selectedContents: contents }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  allFilesContent: {},
  setAllFilesContent: (contents) => set({ allFilesContent: contents }),

  repositoryLanguage: null,
  setRepositoryLanguage: (language) => set({ repositoryLanguage: language }),
  resetRepositoryLanguage: () => set({ repositoryLanguage: null }),

  translationLanguages: [],
  setTranslationLanguages: (languages) => set({ translationLanguages: languages }),
  addTranslationLanguage: (language) => set((state) => ({ translationLanguages: [...state.translationLanguages, language] })),
  removeTranslationLanguage: (code) => set((state) => ({ translationLanguages: state.translationLanguages.filter((lang) => lang.code !== code) })),
}))

export default useBaseStore
