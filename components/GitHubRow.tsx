import React, { useState, ChangeEvent, useEffect } from 'react'
import useBaseStore from '@/stores/baseStore'
import { ring } from 'ldrs'
import { checkSVG, crossSVG } from '@/constants/icons'

ring.register()

const GitHubRow = () => {
  const { repoUrl, setRepoUrl, repoContents, setRepoContents } = useBaseStore()
  const [loading, setLoading] = useState<boolean>(false)
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
        setError('')
        setLoading(true)
        const [owner, repo] = debouncedRepoUrl.split('/').slice(-2)
        if (!owner || !repo) {
          throw new Error('Invalid GitHub repository URL')
        }
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`)
        if (!response.ok) {
          throw new Error('Invalid repository URL or repository not found')
        }
        setRepoContents(await response.json())
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
