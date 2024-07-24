import React, { ChangeEvent, useEffect, useState } from 'react'
import useBaseStore from '@/stores/baseStore'
import useStateStore from '@/stores/stateStore'
import { languages } from '@/constants/languages'
import { LanguageItem } from '@/types/languages'
import { promptPhaseTwo } from '@/utils/ai-sdk/prompts'
import { openai } from '@/utils/ai-sdk/openaiProvider'
import { generateText } from 'ai'
import { AppStates } from '@/types/global'

const AdditionalLanguageSelector: React.FC = () => {
  const {
    repositoryLanguage,
    translationLanguages,
    addTranslationLanguage,
    removeTranslationLanguage,
    baseTranslation,
    allTranslations,
    setAllTranslations,
    setLoading,
  } = useBaseStore()
  const { goToState } = useStateStore()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredLanguages, setFilteredLanguages] = useState<LanguageItem[]>(languages)
  const [error, setError] = useState<string>('')
  const [showLanguageList, setShowLanguageList] = useState<boolean>(false)

  // Filtra los idiomas según el término de búsqueda
  useEffect(() => {
    const filterLanguages = () => {
      const filtered = languages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          lang.code !== repositoryLanguage?.code &&
          !translationLanguages.some((additionalLang) => additionalLang.code === lang.code)
      )
      setFilteredLanguages(filtered)
    }
    filterLanguages()
  }, [searchTerm, repositoryLanguage, translationLanguages])

  // Actualiza el término de búsqueda
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Selecciona un idioma adicional
  const handleLanguageSelect = (lang: LanguageItem) => {
    if (!translationLanguages.some((l) => l.code === lang.code)) {
      addTranslationLanguage(lang)
    }
    setSearchTerm('')
  }

  // Elimina un idioma adicional
  const handleRemoveLanguage = (code: string) => {
    removeTranslationLanguage(code)
  }

  // Extrae los bloques de JSON de un texto
  const extractJsonStrings = (text: string): string[] => {
    const jsonBlocks = text.match(/```json\n([\s\S]*?)\n```/g)
    if (jsonBlocks) {
      return jsonBlocks.map((block) => block.replace(/```json\n|```/g, '').trim())
    }
    const simpleJsonBlocks = text.match(/({[\s\S]*?})/g)
    if (simpleJsonBlocks) {
      return simpleJsonBlocks.map((block) => block.trim())
    }
    return []
  }

  /**
   * Genera las traducciones de los bloques de JSON
   * In: repositoryLanguage, translationLanguages, baseTranslation, allTranslations
   * Out: allTranslations
  **/
  const handleGenerateTranslations = async () => {
    if (!repositoryLanguage || translationLanguages.length === 0 || !baseTranslation || allTranslations.length > 0) return

    setLoading(true)

    try {
      const textPrompt = promptPhaseTwo(repositoryLanguage, translationLanguages, baseTranslation)
      const { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: textPrompt,
      })

      const jsonStrings = extractJsonStrings(text)
      if (jsonStrings.length > 0) {
        const translationsData: string[] = jsonStrings.map((jsonString) => jsonString.trim())
        setAllTranslations(translationsData)
        goToState(AppStates.ALL_TRANSLATIONS)
      } else {
        setAllTranslations([])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Muestra la lista de idiomas al enfocar el input
  const handleInputFocus = () => {
    setShowLanguageList(true)
    const languagesWithoutRepository = languages.filter((lang) => lang.code !== repositoryLanguage?.code)
    setFilteredLanguages(languagesWithoutRepository)
  }

  // Oculta la lista de idiomas al desenfocar el input
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setShowLanguageList(false)
    }
  }

  return (
    <div className='flex flex-col w-full gap-4'>
      <p className='text-xl'>Añadir lenguajes adicionales:</p>

      <div className='flex w-full gap-2 justify-between'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Selecciona los lenguajes"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className='w-fit p-2 bg-transparent text-xl text-green-500 rounded-lg border border-green-500 transition ease-in-out duration-300 hover:scale-105 hover:bg-green-400/25 hover:text-white'
          onClick={handleGenerateTranslations}
          disabled={!repositoryLanguage || translationLanguages.length === 0 || !baseTranslation || allTranslations.length > 0}
        >
          Traducir
        </button>
      </div>

      {showLanguageList && (
        <ul className="absolute mt-24 w-1/6 bg-gray-800 border border-gray-700 rounded shadow-lg z-10 max-h-60 overflow-auto">
          {filteredLanguages.map((lang) => (
            <li
              key={lang.code}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleLanguageSelect(lang)}
              className="block w-full text-left p-2 rounded bg-gray-900 hover:bg-slate-800 transform transition duration-200 cursor-pointer"
            >
              <span className={`fi fi-${lang.code} mr-2`}></span> {lang.name}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap space-x-2">
        {translationLanguages.map((lang) => (
          <div
            key={lang.code}
            className="flex items-center space-x-2 px-2 bg-gray-700 rounded cursor-pointer"
            onClick={() => handleRemoveLanguage(lang.code)}
          >
            <span className={`fi fi-${lang.code} w-10 h-10`}></span>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdditionalLanguageSelector
