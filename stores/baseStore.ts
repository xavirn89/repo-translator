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

  phase1Response: string | null
  setPhase1Response: (response: string) => void
  resetPhase1Response: () => void

  phase2Response: string[]
  setPhase2Response: (response: string[]) => void
  addPhase2Response: (response: string) => void
  removePhase2Response: (response: string) => void
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

  phase1Response: null,
  setPhase1Response: (response) => set({ phase1Response: response }),
  resetPhase1Response: () => set({ phase1Response: null }),

  phase2Response: [],
  setPhase2Response: (response) => set({ phase2Response: response }),
  addPhase2Response: (response) => set((state) => ({ phase2Response: [...state.phase2Response, response] })),
  removePhase2Response: (response) => set((state) => ({ phase2Response: state.phase2Response.filter((res) => res !== response) })),
}))

export default useBaseStore
