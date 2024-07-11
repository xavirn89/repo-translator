'use client'
import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'
import React, { ChangeEvent, useEffect, useState } from 'react'

const IncludedItems = () => {
  const { repoContents, loading, selectedContents, setSelectedContents } = useBaseStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectItem = (item: RepositoryItem) => {
    setSelectedContents([...selectedContents, item])
  }

  const handleRemoveItem = (item: RepositoryItem) => {
    setSelectedContents(selectedContents.filter(selected => selected.sha !== item.sha))
  }

  const filteredContents = repoContents?.filter(content => 
    content.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
    !selectedContents.some(selected => selected.sha === content.sha)
  )

  return (
    <div className='flex flex-col w-full max-w-3xl'>
      {repoContents && !loading && (
        <div className='relative flex w-full gap-2'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search files"
            className="p-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-11 w-full max-w-xs"
          />
          {debouncedSearchTerm && filteredContents && filteredContents?.length > 0 && (
            <ul className="absolute right-0 top-0 ml-2 w-48 mt-0 space-y-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
              {filteredContents?.map((repoContent) => (
                <li key={repoContent.sha}>
                  <button
                    onClick={() => handleSelectItem(repoContent)}
                    className="block w-full text-left p-2 rounded bg-gray-800 hover:bg-slate-700 transform transition duration-200"
                  >
                    {repoContent.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex flex-wrap space-x-2">
        {selectedContents.map((item) => (
          <div
            key={item.sha}
            onClick={() => handleRemoveItem(item)}
            className="flex items-center p-2 mb-2 bg-gray-700 rounded cursor-pointer transform hover:scale-105 hover:bg-red-500/50 transition duration-200"
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IncludedItems
