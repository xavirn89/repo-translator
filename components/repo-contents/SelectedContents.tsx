'use client'
import React from 'react'
import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'

const SelectedContents: React.FC = () => {
  const { selectedContents, deleteSelectedContent, repoUrl } = useBaseStore()

  // Obtiene la URL del item seleccionado
  const getItemUrl = (item: RepositoryItem): string => {
    if (!repoUrl) return ''
    
    const url = item._links.html
    return url
      .replace(repoUrl, '')
      .replace('/blob/main/', '')
      .replace('/tree/main/', '')
  }

  // Elimina un item de la lista de seleccionados
  const handleRemoveItem = (item: RepositoryItem) => {
    deleteSelectedContent(item)
  }

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
