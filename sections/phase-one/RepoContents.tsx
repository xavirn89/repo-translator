'use client'
import useBaseStore from '@/stores/baseStore'
import SearchAndSelectData from '@/sections/phase-one/SearchAndSelectData'
import RecursiveRepoContents from '@/sections/phase-one/RecursiveRepoContents'
import SelectOriginalLanguage from '@/sections/phase-one/SelectOriginalLanguage'
import ButtonProcessPhaseOne from '@/sections/phase-one/ButtonProcessPhaseOne'

const RepoContents = () => {
  const { repoContents } = useBaseStore()

  if (!repoContents) return null

  if (repoContents) return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex w-full max-w-7xl justify-between gap-4'>
        <div className='w-1/3'>
          <RecursiveRepoContents items={repoContents} level={0} />
        </div>

        <div className='flex flex-col w-2/3 gap-4'>
          <SearchAndSelectData />
          <SelectOriginalLanguage />
          <ButtonProcessPhaseOne />
        </div>
      </div>
    </div>
  )
}

export default RepoContents