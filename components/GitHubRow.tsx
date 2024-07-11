'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import useBaseStore from '@/stores/baseStore'
import { checkSVG, crossSVG } from '@/constants/icons'
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

const GitHubRow: React.FC = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents, loading, setLoading } = useBaseStore()
  const [error, setError] = useState<string>('')
  const [debouncedRepoUrl, setDebouncedRepoUrl] = useState<string | null>(repoUrl || '')

  // To-Delete
  useEffect(() => {
    setRepoContents(ghjson as RepositoryItem[])
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
        setLoading(true)
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
        setLoading(false)
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
    <div className='flex w-full max-w-3xl gap-2'>
      <input
        type="text"
        value={repoUrl || ''}
        onChange={handleInputChange}
        placeholder="Enter GitHub repository URL"
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className='w-20'>
        {loading && (
          <l-ring size="20" stroke="5" bg-opacity="0" speed="2" color="white" />
        )}

        {repoContents && !loading && (
          checkSVG
        )}
      </div>
    </div>
  )
}

export default GitHubRow
