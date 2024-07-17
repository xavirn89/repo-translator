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
        <div className='flex'>
          <ul>
            <li> ▸ Repository must be public</li>
            <li> ▸ Enter a valid URL</li>
          </ul>
        </div>

        <div className='flex flex-col gap-3 items-center'>
          <Image
            priority
            src={'/icons/githubwhite.png'}
            width={100}
            height={100}
            alt="Follow us on Twitter"
          />

          <Image
            priority
            src={'/icons/vercelwhite.png'}
            width={150}
            height={100}
            alt="Follow us on Twitter"
            className='mb-2'
          />

          <Image
            priority
            src={'/icons/openaiwhite.png'}
            width={150}
            height={100}
            alt="Follow us on Twitter"
          />


        </div>
      </div>
    </div>
  )
}

export default RepoInputBanner