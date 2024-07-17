'use client'
import React, { useEffect } from 'react'
import { ring } from 'ldrs'
import useBaseStore from '@/stores/baseStore'
import AdditionalLanguageSelector from '@/components/phase-two/AdditionalLanguageSelector'
if (typeof window !== 'undefined') {
  ring.register()
}

interface InProps {
  targetId: string
}

const FirstResultAndTranslations = ({ targetId }: InProps) => {
  const {loading, phase1Response, repoContents, repositoryLanguage} = useBaseStore()

  useEffect(() => {
    const targetElement = document.getElementById("base-translation-done");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [phase1Response])

  if (loading && repoContents && !phase1Response) return (
    <div className='flex flex-col w-full justify-center items-center mb-24'>
      <div className='flex w-full max-w-7xl justify-center'>
        <l-ring size="100" stroke="15" bg-opacity="0" speed="2" color="white" />
      </div>
    </div>
  )

  if (phase1Response) return (
    <div className='flex flex-col w-full items-center mb-10 h-full'>
      <div className='flex w-full max-w-7xl justify-between gap-4 h-full'>

        <div className='flex flex-col h-full w-2/3 gap-4' id="base-translation-done">
          <p className='text-xl'>{repositoryLanguage?.code}.json</p>
          <textarea className='text-white w-full h-[800px] bg-slate-500/25 rounded-2xl p-4 border border-slate-500/50' value={phase1Response ?? ''} onChange={() => {}} />
        </div>

        <div className='flex flex-col w-1/3 gap-4'>
          <AdditionalLanguageSelector targetId={targetId} />
        </div>
        
      </div>
    </div>
  )

  return null
}

export default FirstResultAndTranslations