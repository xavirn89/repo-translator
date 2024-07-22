'use client'
import useBaseStore from '@/stores/baseStore'
import SelectContent from '@/sections/dashboard/repo-contents/SelectContent'
import RecursiveRepoContents from '@/components/repo-contents/RecursiveRepoContents'
import SelectOriginalLanguage from '@/sections/dashboard/repo-contents/SelectOriginalLanguage'
import ProcessBaseTranslation from '@/components/repo-contents/ProcessBaseTranslation'

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
          <SelectContent />
          <SelectOriginalLanguage />
          <ProcessBaseTranslation />
        </div>
      </div>
    </div>
  )
}

export default RepoContents