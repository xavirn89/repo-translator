'use client'
import useBaseStore from '@/stores/baseStore'
import React from 'react'

const ResultPhaseOne = () => {
  const { phase1Response } = useBaseStore()
  return (
    <div className='flex flex-col w-full gap-2 p-6 h-full'>
      <textarea className='text-white h-full bg-transparent' value={phase1Response ?? ''}/>
    </div>
    )
}

export default ResultPhaseOne
