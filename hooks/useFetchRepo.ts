import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import useBaseStore from '@/stores/baseStore'
import useStateStore from '@/stores/stateStore'
import { AppStates } from '@/types/global'
import { fetchRepoContents } from '@/utils/github'

const useFetchRepo = (repoUrl: string | null) => {
  const { setRepoContents, setLoading, repoContents } = useBaseStore()
  const { goToState } = useStateStore()
  const [error, setError] = useState<string>('')

  /**
   * Fetch de los archivos del repositorio
   * In: repoUrl
   * Out: repoContents
  **/
  useEffect(() => {
    if (!repoUrl || (repoContents && repoContents.length)) return

    const debouncedFetchFiles = debounce(async (url: string) => {
      try {
        setLoading(true)
        setError('')
        const [owner, repo] = url.split('/').slice(-2)
        if (!owner || !repo) {
          throw new Error('Invalid GitHub repository URL')
        }
        const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`
        const contents = await fetchRepoContents(repoContentsUrl)
        setRepoContents(contents)
        goToState(AppStates.REPOSITORY_CONTENTS)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000)

    debouncedFetchFiles(repoUrl)

    return () => {
      debouncedFetchFiles.cancel()
    }
  }, [repoUrl, repoContents, setRepoContents, setLoading, goToState])

  return { error }
}

export default useFetchRepo
