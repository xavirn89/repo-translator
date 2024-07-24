import { create } from 'zustand'
import { RepositoryItem } from '@/types/github'
import { LanguageItem } from '@/types/languages'

interface BaseStoreState {
  repoUrl: string | null
  setRepoUrl: (url: string) => void
  resetRepoUrl: () => void

  repoContents: RepositoryItem[] | null
  setRepoContents: (contents: RepositoryItem[]) => void
  resetRepoContents: () => void

  selectedContents: RepositoryItem[]
  addSelectedContent: (content: RepositoryItem) => void
  deleteSelectedContent: (content: RepositoryItem) => void

  loading: boolean
  setLoading: (loading: boolean) => void

  allFilesContent: { [key: string]: string }
  setAllFilesContent: (contents: { [key: string]: string }) => void
  resetAllFilesContent: () => void

  repositoryLanguage: LanguageItem | null
  setRepositoryLanguage: (language: LanguageItem) => void
  resetRepositoryLanguage: () => void

  translationLanguages: LanguageItem[]
  setTranslationLanguages: (languages: LanguageItem[]) => void
  addTranslationLanguage: (language: LanguageItem) => void
  removeTranslationLanguage: (code: string) => void

  baseTranslation: string | null
  setBaseTranslation: (response: string) => void
  resetBaseTranslation: () => void

  allTranslations: string[]
  setAllTranslations: (response: string[]) => void
  resetAllTranslations: () => void

  customOpenAIKey: string | null
  setCustomOpenAIKey: (key: string | null) => void
}

const useBaseStore = create<BaseStoreState>((set, get) => ({
  repoUrl: null,
  setRepoUrl: (url) => set({ repoUrl: url }),
  resetRepoUrl: () => set({ repoUrl: null }),

  repoContents: null,
  setRepoContents: (contents) => set({ repoContents: contents }),
  resetRepoContents: () => set({ repoContents: null }),

  selectedContents: [],
  addSelectedContent: (content) => set((state) => ({ selectedContents: [...state.selectedContents, content] })),
  deleteSelectedContent: (content) => set((state) => ({ selectedContents: state.selectedContents.filter((selected) => selected.sha !== content.sha) })),

  loading: false,
  setLoading: (loading) => set({ loading }),

  allFilesContent: {},
  setAllFilesContent: (contents) => set({ allFilesContent: contents }),
  resetAllFilesContent: () => set({ allFilesContent: {} }),

  repositoryLanguage: null,
  setRepositoryLanguage: (language) => set({ repositoryLanguage: language }),
  resetRepositoryLanguage: () => set({ repositoryLanguage: null }),

  translationLanguages: [],
  setTranslationLanguages: (languages) => set({ translationLanguages: languages }),
  addTranslationLanguage: (language) => set((state) => ({ translationLanguages: [...state.translationLanguages, language] })),
  removeTranslationLanguage: (code) => set((state) => ({ translationLanguages: state.translationLanguages.filter((lang) => lang.code !== code) })),

  baseTranslation: null,
  setBaseTranslation: (response) => set({ baseTranslation: response }),
  resetBaseTranslation: () => set({ baseTranslation: null }),

  allTranslations: [],
  setAllTranslations: (response) => set({ allTranslations: response }),
  resetAllTranslations: () => set({ allTranslations: [] }),

  customOpenAIKey: null,
  setCustomOpenAIKey: (key) => set({ customOpenAIKey: key }),
}))

export default useBaseStore
