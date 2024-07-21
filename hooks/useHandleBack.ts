import useStateStore from '@/stores/stateStore'
import React from 'react'
import { AppStates } from '@/types/global'
import useBaseStore from '@/stores/baseStore'

const useHandleBack = () => {
  const { resetRepoUrl, resetRepoContents, resetPhase1Response, resetAllFilesContent } = useBaseStore()
  const { currentState, goToState } = useStateStore()

  const goBack = () => {
    switch (currentState) {
      case AppStates.REPOSITORY_CONTENTS:
        resetRepoUrl()
        resetRepoContents()
        goToState(AppStates.HOME)
        break
      
      case AppStates.BASE_TRANSLATION:
        resetPhase1Response()
        resetAllFilesContent()
        goToState(AppStates.REPOSITORY_CONTENTS)
        break

      case AppStates.ALL_TRANSLATIONS:
        goToState(AppStates.BASE_TRANSLATION)
        break

      case AppStates.HOME:
        break

      default:
        break
    }
  }

  return { goBack }
}

export default useHandleBack