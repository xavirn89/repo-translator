import useStateStore from '@/stores/stateStore'
import useBaseStore from '@/stores/baseStore'
import { AppStates } from '@/types/global'

const useHandleBack = () => {
  const {
    resetRepoUrl,
    resetRepoContents,
    resetBaseTranslation,
    resetAllFilesContent,
    resetAllTranslations, 
    resetRepositoryLanguage
  } = useBaseStore()
  const { currentState, goToState } = useStateStore()

  /**
   * Gestiona el comportamiento de la navegación hacia atrás
   * In: currentState
   * Out: void
  **/
  const goBack = () => {
    switch (currentState) {
      case AppStates.REPOSITORY_CONTENTS:
        resetRepoUrl()
        resetRepoContents()
        resetRepositoryLanguage()
        goToState(AppStates.HOME)
        break

      case AppStates.BASE_TRANSLATION:
        resetBaseTranslation()
        resetAllFilesContent()
        goToState(AppStates.REPOSITORY_CONTENTS)
        break

      case AppStates.ALL_TRANSLATIONS:
        resetAllTranslations()
        goToState(AppStates.BASE_TRANSLATION)
        break

      case AppStates.HOME:
        break

      default:
        break
    }
  }

  // Gestiona el comportamiento de la navegación hacia la página principal
  const goHome = () => {
    resetRepoUrl()
    resetRepoContents()
    resetBaseTranslation()
    resetAllFilesContent()
    resetAllTranslations()
    goToState(AppStates.HOME)
  }

  return { goBack, goHome }
}

export default useHandleBack
