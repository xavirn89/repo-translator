'use client'
import React, { useEffect } from 'react'
import { ring } from 'ldrs'
import useBaseStore from '@/stores/baseStore'

if (typeof window !== 'undefined') {
  ring.register()
}

const TranslationOptions = () => {
  const {loading, phase1Response, repoContents} = useBaseStore()

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
        <div className='flex h-full min-h-[800px] w-2/3' id="base-translation-done">
          <textarea className='text-white w-full h-[800px] bg-white/10 rounded-2xl p-4 border border-white/25' value={phase1Response ?? ''} onChange={() => {}} />
        </div>

        <div className='flex flex-col w-1/3 gap-4'>

        </div>
      </div>
    </div>
  )

  return null
}

export default TranslationOptions