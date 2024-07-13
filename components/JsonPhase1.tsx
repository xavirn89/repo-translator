'use client'
import useBaseStore from '@/stores/baseStore'
import React from 'react'

const JsonPhase1 = () => {
  const { phase1Response } = useBaseStore()
  return (
    <div className='flex flex-col w-full gap-2 p-6 h-full'>
      <pre>{phase1Response}</pre>
    </div>
  )
}

export default JsonPhase1