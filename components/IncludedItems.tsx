'use client'
import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'
import { get } from 'http'
import React, { ChangeEvent, useEffect, useState } from 'react'

const IncludedItems = () => {
  const { repoContents, loading, selectedContents, addSelectedContent, deleteSelectedContent } = useBaseStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  const [filteredContents, setFilteredContents] = useState<RepositoryItem[] | null>(null)
  
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
    addSelectedContent(item)
  }

  const handleRemoveItem = (item: RepositoryItem) => {
    deleteSelectedContent(item)
  }

  useEffect(() => {
    const searchPaths = debouncedSearchTerm.split('/')
    let currentContents = repoContents

    for (let i = 0; i < searchPaths.length; i++) {
      const term = searchPaths[i].toLowerCase()
      if (!currentContents) break

      if (i === searchPaths.length - 1) {
        setFilteredContents(
          currentContents.filter(item => 
            item.name.toLowerCase().includes(term) &&
            !selectedContents.some(selected => selected.sha === item.sha)
          )
        )
      } else {
        const foundItem = currentContents.find(item => item.name.toLowerCase() === term)
        if (foundItem) {
          currentContents = foundItem.content
        } else {
          currentContents = null
        }
      }
    }
  }, [debouncedSearchTerm, selectedContents, repoContents])

  function getItemUrl(item: RepositoryItem) {
    //from item._link.html = "html": "https://github.com/xavirn89/bentogridgenerator/blob/main/public/favicon/android-chrome-192x192.png"
    //i want to return public/favicon/android-chrome-192x192.png

    const url = item._links.html
    const urlParts = url.split('/')
    const urlPartsLength = urlParts.length
    return urlParts.slice(urlPartsLength - 2).join('/')
  }

  return (
    <div className='flex flex-col w-full gap-2 p-6 border-r border-white h-full'>
      {repoContents && !loading && (
        <div className='relative flex flex-col w-full gap-2'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search files"
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-11 w-full"
          />
          {debouncedSearchTerm && filteredContents && filteredContents.length > 0 && (
            <ul className="bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
              {filteredContents.map((repoContent) => (
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
            <span>{getItemUrl(item)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IncludedItems