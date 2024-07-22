import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'
import React, { ChangeEvent, useEffect, useState } from 'react'

const InputSearchContents = () => {
  const { repoContents, selectedContents, addSelectedContent, repoUrl } = useBaseStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  const [filteredContents, setFilteredContents] = useState<RepositoryItem[] | null>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)

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
          ).slice(0, 6)
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

  return (
    <div className='flex flex-col w-full relative'>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar archivos o carpetas"
        className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/75 h-11 w-full"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && debouncedSearchTerm && filteredContents && filteredContents.length > 0 && (
        <ul className="absolute top-12 w-2/3 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
          {filteredContents.map((repoContent) => (
            <li key={repoContent.sha}>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectItem(repoContent)}
                className="block w-full text-left p-2 rounded bg-gray-900 hover:bg-slate-800 transform transition duration-200"
              >
                {repoContent.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default InputSearchContents
