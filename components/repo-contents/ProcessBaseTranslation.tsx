'use client'
import React, { useEffect } from 'react'
import { fetchAllFiles } from '@/utils/github'
import { openai } from '@/utils/ai-sdk/openaiProvider'
import { generateText } from 'ai'
import useBaseStore from '@/stores/baseStore'
import { promptPhaseOne } from '@/utils/ai-sdk/prompts'
import useStateStore from '@/stores/stateStore'
import { AppStates } from '@/types/global'
import { CleanAndPrepareBaseTranslation } from '@/utils/openai'

const ProcessBaseTranslation: React.FC = () => {
  const {
    selectedContents,
    setLoading,
    allFilesContent,
    setAllFilesContent,
    loading,
    repositoryLanguage,
    setBaseTranslation
  } = useBaseStore()
  const { goToState } = useStateStore()

  /**
   * Procesa el contenido seleccionado para generar la traducción base
   * In: selectedContents
   * Out: allFilesContent
  **/
  const handleProcessSelectedContents = async () => {
    setLoading(true)
    let allContents: { [key: string]: string } = {}

    try {
      for (const item of selectedContents) {
        const contents = await fetchAllFiles(item)
        allContents = { ...allContents, ...contents }
      }
      setAllFilesContent(allContents)
    } catch (err: any) {
      console.error(err)
      setLoading(false)
    }
  }

  /**
   * Genera la traducción base a partir de los contenidos seleccionados
   * In: allFilesContent, repositoryLanguage
   * Out: baseTranslation
  **/
  useEffect(() => {
    if (!allFilesContent || Object.keys(allFilesContent).length === 0 || !repositoryLanguage) return

    const cleaned: { [key: string]: string } = {}
    for (const [key, value] of Object.entries(allFilesContent)) {
      cleaned[key] = value.replace(/\s+/g, ' ')
    }

    const createPromptAndGenerateJSON = async (cleaned: { [key: string]: string }) => {
      try {
        const { text } = await generateText({
          model: openai('gpt-4-turbo'),
          prompt: promptPhaseOne(repositoryLanguage) + Object.values(cleaned).join(' '),
        })
        const cleanedText = CleanAndPrepareBaseTranslation(text)
        setBaseTranslation(cleanedText)
        goToState(AppStates.BASE_TRANSLATION)
      } catch (err: any) {
        console.error(err)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    createPromptAndGenerateJSON(cleaned)
  }, [allFilesContent, repositoryLanguage, setBaseTranslation, goToState, setLoading])

  return (
    <div className='relative flex w-full gap-6 mt-10'>
      <div className='w-1/2'>
      </div>

      <div className='flex w-1/2 justify-end'>
        <button
          className='w-52 p-2 bg-transparent text-green-500 rounded-lg border border-green-500 transition ease-in-out duration-300 hover:scale-105 hover:bg-green-400/25 hover:text-white'
          onClick={handleProcessSelectedContents}
          disabled={loading}
        >
          Generar Traducción
        </button>
      </div>
    </div>
  )
}

export default ProcessBaseTranslation
