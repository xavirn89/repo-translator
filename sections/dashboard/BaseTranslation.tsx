'use client'
import React from 'react'
import useBaseStore from '@/stores/baseStore'
import AdditionalLanguageSelector from '@/components/base-translation/AdditionalLanguageSelector'
import DownloadBaseTranslation from '@/components/base-translation/DownloadBaseTranslation'

const BaseTranslation = () => {
  const { baseTranslation, repositoryLanguage, setBaseTranslation } = useBaseStore()

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBaseTranslation(event.target.value)
  }

  if (baseTranslation) return (
    <div className='flex flex-col w-full items-center mb-10 h-full'>
      <div className='flex w-full max-w-7xl justify-between gap-4 h-full'>

        <div className='flex flex-col h-full w-2/3' id="base-translation-done">
          <div className='flex'>
            <div className='px-4 py-2 rounded-t-lg bg-gray-200 text-gray-800'>
              {repositoryLanguage?.code}.json
            </div>
          </div>
          <textarea 
            className='text-white w-full h-[800px] bg-slate-500/25 rounded-se-2xl rounded-b-2xl p-4 border border-slate-500/50' 
            value={baseTranslation ?? ''} 
            onChange={handleTextareaChange} 
          />
        </div>

        <div className='flex flex-col w-1/3 gap-12'>
          <DownloadBaseTranslation />
          <AdditionalLanguageSelector />
        </div>
        
      </div>
    </div>
  )

  return null
}

export default BaseTranslation
