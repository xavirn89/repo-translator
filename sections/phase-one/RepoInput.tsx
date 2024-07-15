'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import useBaseStore from '@/stores/baseStore'
import { RepositoryItem } from '@/types/github'

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

const RepoInput: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents, loading, setLoading } = useBaseStore()
  const [error, setError] = useState<string>('')
  const [debouncedRepoUrl, setDebouncedRepoUrl] = useState<string | null>(repoUrl || '')

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
        setLoading(true)
        setError('')
        const [owner, repo] = debouncedRepoUrl.split('/').slice(-2)
        if (!owner || !repo) {
          throw new Error('Invalid GitHub repository URL')
        }
        const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`
        const contents = await fetchRepoContents(repoContentsUrl)
        setRepoContents(contents)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
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
    <div className='flex flex-col gap-2 p-6 items-center'>
      <div className='flex w-full max-w-md items-center pt-10'>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github mr-2" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
        
        <input
          type="text"
          value={repoUrl || ''}
          onChange={handleInputChange}
          placeholder="Enter GitHub repository URL"
          className="w-full p-2 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

export default RepoInput
