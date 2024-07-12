'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'
import { ring } from 'ldrs'

// To-Delete
import { ghjson } from '@/utils/test/gh'
// ---------

if (typeof window !== 'undefined') {
  ring.register()
}

const fetchRepoContents = async (url: string): Promise<RepositoryItem[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch repository contents')
  }
  const items: RepositoryItem[] = await response.json()

  const allItems = await Promise.all(items.map(async (item) => {
    if (item.type === 'dir') {
      const subItems = await fetchRepoContents(item.url)
      return { ...item, content: subItems }
    } else {
      return { ...item, content: null }
    }
  }))
  
  return allItems
}

const checkSVG = (
  <svg fill="#000000" viewBox="0 0 24 24" id="check-circle" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className="icon flat-line w-10 h-10">
    <g id="SVGRepo_bgCarrier" className="stroke-0"></g>
    <g id="SVGRepo_tracerCarrier" className="stroke-linecap-round stroke-linejoin-round"></g>
    <g id="SVGRepo_iconCarrier">
      <circle id="secondary" cx="12" cy="12" r="9" className="fill-green-500 stroke-2"></circle>
      <polyline id="primary" points="8 12 11 15 16 10" className="fill-none stroke-white stroke-linecap-round stroke-linejoin-round stroke-2"></polyline>
    </g>
  </svg>
)

const crossSVG = (
  <svg fill="#000000" viewBox="0 0 24 24" id="cross-circle" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className="icon flat-line w-10 h-10">
    <g id="SVGRepo_bgCarrier" className="stroke-0"></g>
    <g id="SVGRepo_tracerCarrier" className="stroke-linecap-round stroke-linejoin-round"></g>
    <g id="SVGRepo_iconCarrier">
      <circle id="secondary" cx="12" cy="12" r="9" className="fill-red-500 stroke-2"></circle>
      <line id="primary" x1="15" y1="15" x2="9" y2="9" className="fill-none stroke-white stroke-linecap-round stroke-linejoin-round stroke-2"></line>
      <line id="primary-2" data-name="primary" x1="9" y1="15" x2="15" y2="9" className="fill-none stroke-white stroke-linecap-round stroke-linejoin-round stroke-2"></line>
    </g>
  </svg>
)

const RecursiveRepoContents: React.FC<{ items: RepositoryItem[], level: number }> = ({ items, level }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

  const handleToggle = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className='flex flex-col w-full'>
      {items.map((item, index) => (
        <div key={index} className={`p-1 bg-slate-500/15 mb-0.5 ml-${level * 2}`}>
          <div onClick={() => handleToggle(index)} className="cursor-pointer flex items-center justify-between">
            <p>{item.name}</p>
            {item.type === 'dir' && (
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${expanded[index] ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
          {item.content && expanded[index] && (
            <div className="transition-all duration-300 ease-in-out">
              <RecursiveRepoContents items={item.content} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const GitHubRow: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents, loading, setLoading } = useBaseStore()
  const [error, setError] = useState<string>('')
  const [debouncedRepoUrl, setDebouncedRepoUrl] = useState<string | null>(repoUrl || '')
  const [loadingComponent, setLoadingComponent] = useState<boolean>(false)

  // To-Delete
  useEffect(() => {
    setRepoContents(ghjson as RepositoryItem[])
    setRepoUrl('https://github.com/xavirn89/bentogridgenerator')
  }, [])
  useEffect(() => {
    //console.log(JSON.stringify(repoContents, null, 2))
  }, [repoContents])
  // ---------

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRepoUrl(repoUrl)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [repoUrl])

  useEffect(() => {
    const fetchFiles = async () => {
      if (!debouncedRepoUrl) {
        setError('Please enter a GitHub repository URL')
        return
      }

      try {
        setError('')
        setLoadingComponent(true)
        const [owner, repo] = debouncedRepoUrl.split('/').slice(-2)
        if (!owner || !repo) {
          throw new Error('Invalid GitHub repository URL')
        }
        const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`
        const contents = await fetchRepoContents(repoContentsUrl)
        setRepoContents(contents)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoadingComponent(false)
      }
    }

    if (debouncedRepoUrl) {
      fetchFiles()
    }
  }, [debouncedRepoUrl, setRepoContents])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value)
  }

  return (
    <div className='flex flex-col w-full gap-2 p-6 border-r border-white h-full'>
      <div className='flex w-full'>
        <input
          type="text"
          value={repoUrl || ''}
          onChange={handleInputChange}
          placeholder="Enter GitHub Repository URL"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className=''>
          {loading && (
            <l-ring size="30" stroke="5" bg-opacity="0" speed="2" color="white" />
          )}
        </div>
        <div className=''>
          {repoContents && !loadingComponent && (
            checkSVG
          )}
        </div>
      </div>

      <div className='flex flex-col w-full h-full'>
        {repoContents && <RecursiveRepoContents items={repoContents} level={0} />}
      </div>
    </div>
  )
}

export default GitHubRow
