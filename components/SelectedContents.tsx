import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'
import React from 'react'

const SelectedContents = () => {
  const { selectedContents, deleteSelectedContent, repoUrl } = useBaseStore()

  function getItemUrl(item: RepositoryItem) {
    if (!repoUrl) return ''

    const url = item._links.html
    const url2 = url.replace(repoUrl, '')
    const url3 = url2.replace('/blob/main/', '')
    const url4 = url3.replace('/tree/main/', '')
    return url4
  }

  const handleRemoveItem = (item: RepositoryItem) => {
    deleteSelectedContent(item)
  }

  console.log('selectedContents', selectedContents)
  return (
    <div className='flex w-full'>
      <div className="flex flex-wrap gap-2">
        {repoUrl && selectedContents.map((item) => (
          <div
            key={item.sha}
            onClick={() => handleRemoveItem(item)}
            className="flex items-center p-3 bg-gray-700 rounded cursor-pointer transform hover:scale-105 hover:bg-red-500/50 transition duration-200"
          >
            <span className='text-sm'>{getItemUrl(item)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectedContents