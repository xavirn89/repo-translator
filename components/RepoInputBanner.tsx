'use client'
import { ring } from 'ldrs'
import useStateStore from '@/stores/stateStore'
import Image from 'next/image'
import useBaseStore from '@/stores/baseStore'
import { AppStates } from '@/types/global'

const RepoInputBanner = () => {
  const { loading } = useBaseStore()
  const { currentState } = useStateStore()

  if (currentState !== AppStates.HOME || loading) return null

  if (currentState === AppStates.HOME) return (
    <div className='flex flex-grow w-full justify-center items-center'>
      <div className='flex w-full max-w-5xl justify-between items-center mt-20'>

        <div className='flex items-center'>
          <ul>
            <li> ▸ El repositorio debe ser público</li>
            <li> ▸ Se debe introducir la URL completa del repositorio</li>
          </ul>
        </div>

        <div className='flex flex-col gap-3 items-center'>
          <Image
            priority
            src={'/icons/githubwhite.png'}
            width={80}
            height={80}
            className='w-auto h-auto'
            alt="Follow us on Twitter"
          />

          <Image
            priority
            src={'/icons/vercelwhite.png'}
            width={100}
            height={50}
            className='w-auto h-auto mb-2'
            alt="Follow us on Twitter"
          />

          <Image
            priority
            src={'/icons/openaiwhite.png'}
            width={100}
            height={0}
            className='w-auto h-auto mb-2'
            alt="Follow us on Twitter"
          />


        </div>
      </div>
    </div>
  )
}

export default RepoInputBanner