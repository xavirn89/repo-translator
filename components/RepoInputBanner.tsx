'use client'
import React from 'react'
import useStateStore from '@/stores/stateStore'
import Image from 'next/image'
import useBaseStore from '@/stores/baseStore'
import { AppStates } from '@/types/global'

const RepoInputBanner: React.FC = () => {
  const { loading } = useBaseStore()
  const { currentState } = useStateStore()

  if (currentState !== AppStates.HOME || loading) return null
  
  return (
    <div className='flex flex-grow w-full justify-center items-center'>
      <div className='flex w-full max-w-5xl justify-between items-center bg-slate-500/10 py-10 px-20 mt-10 rounded-2xl'>
        <div className='flex items-center'>
          <ul>
            <li>▸ El repositorio debe ser público</li>
            <li>▸ Se debe introducir la URL completa del repositorio</li>
          </ul>
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <Image
            priority
            src='/icons/githubwhite.png'
            width={80}
            height={80}
            className='w-auto h-auto'
            alt='GitHub Logo'
          />
          <Image
            priority
            src='/icons/vercelwhite.png'
            width={100}
            height={50}
            className='w-auto h-auto mb-2'
            alt='Vercel Logo'
          />
          <Image
            priority
            src='/icons/openaiwhite.png'
            width={100}
            height={50}  // Cambié de 0 a 50 para que sea visible
            className='w-auto h-auto mb-2'
            alt='OpenAI Logo'
          />
        </div>
      </div>
    </div>
  )
}

export default RepoInputBanner
