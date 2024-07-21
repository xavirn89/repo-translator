'use client'
import React from 'react'
import { ring } from 'ldrs'
import useBaseStore from '@/stores/baseStore'

if (typeof window !== 'undefined') {
  ring.register()
}

const Loading = () => {
  const { loading } = useBaseStore()

  if (!loading) return null

  return (
    <div className='bg-black/75 fixed inset-0 flex justify-center items-center z-50'>
      <l-ring size="100" stroke="15" bg-opacity="0" speed="2" color="white" />
    </div>
  )
}

export default Loading
