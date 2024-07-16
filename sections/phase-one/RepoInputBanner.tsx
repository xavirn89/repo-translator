'use client'
import { useEffect } from 'react'
import PhaseOneInfo from '@/components/PhaseOneInfo'
import useBaseStore from '@/stores/baseStore'
import { ring } from 'ldrs'

if (typeof window !== 'undefined') {
  ring.register()
}

interface InProps {
  targetId: string
}

const RepoInputBanner = ({ targetId }: InProps) => {
  const { loading, repoContents } = useBaseStore()

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, repoContents])

  if (repoContents) return null

  return (
    <div className='flex flex-grow w-full justify-center items-center'>
      {!loading && !repoContents && <PhaseOneInfo />}

      {loading && !repoContents && <l-ring size="100" stroke="15" bg-opacity="0" speed="2" color="white" />}
    </div>
  )
}

export default RepoInputBanner