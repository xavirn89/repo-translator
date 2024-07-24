'use client'
import React, { useEffect, useState } from 'react'
import useBaseStore from '@/stores/baseStore'
import { LanguageItem } from '@/types/languages'
import DownloadAllTranslations from '@/components/all-translations/DownloadAllTranslations'

const AllTranslations: React.FC = () => {
  const {
    loading,
    allTranslations,
    translationLanguages,
    repositoryLanguage,
    baseTranslation
  } = useBaseStore()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [jsonCodes, setJsonCodes] = useState<string[]>([])
  const [languages, setLanguages] = useState<LanguageItem[]>([])

  // Actualiza los códigos JSON y los idiomas
  useEffect(() => {
    const codes = baseTranslation ? [baseTranslation, ...allTranslations] : allTranslations
    setJsonCodes(codes)

    const langs = repositoryLanguage ? [repositoryLanguage, ...translationLanguages] : translationLanguages
    setLanguages(langs)
  }, [allTranslations, baseTranslation, repositoryLanguage, translationLanguages])

  if (loading || !allTranslations || allTranslations.length === 0) return null

  return (
    <div className='flex flex-col w-full items-center mb-10 h-full'>
      <div className='flex w-full max-w-7xl justify-between gap-4 h-full'>

        <div className='flex flex-col h-full w-2/3'>
          <div className='flex'>
            {languages.map((language, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === index ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {language.code}.json
              </button>
            ))}
          </div>
          {jsonCodes.map((item, index) => (
            <div
              key={index}
              className={`${
                activeTab === index ? 'block' : 'hidden'
              } w-full h-full`}
            >
              <textarea
                className='text-white w-full h-[800px] bg-slate-500/25 rounded-se-2xl rounded-b-2xl p-4 border border-slate-500/50'
                value={item}
                readOnly
              />
            </div>
          ))}
        </div>

        <div className='flex flex-col w-1/3 gap-12'>
          <DownloadAllTranslations jsonCodes={jsonCodes} languages={languages} />
        </div>
      </div>
    </div>
  )
}

export default AllTranslations
