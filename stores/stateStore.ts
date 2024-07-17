import { create } from 'zustand';
import { AppStates } from '@/types/global';

interface StateStoreState {
  currentState: AppStates;
  nextState: () => void;
  prevState: () => void;
  goToHome: () => void;
  goToState: (state: AppStates) => void;
}

const useStateStore = create<StateStoreState>((set, get) => ({
  currentState: AppStates.HOME,

  nextState: () => {
    console.log('nextState')
    const currentState = get();
    switch (currentState.currentState) {
      case AppStates.HOME:
        set({ currentState: AppStates.REPOSITORY_CONTENTS });
        break;
      case AppStates.REPOSITORY_CONTENTS:
        set({ currentState: AppStates.BASE_TRANSLATION });
        break;
      case AppStates.BASE_TRANSLATION:
        set({ currentState: AppStates.ALL_TRANSLATIONS });
        break;
      case AppStates.ALL_TRANSLATIONS:
        set({ currentState: AppStates.ALL_TRANSLATIONS });
        break;
    }
  },

  prevState: () => {
    const currentState = get();
    switch (currentState.currentState) {
      case AppStates.HOME:
        set({ currentState: AppStates.HOME });
        break;
      case AppStates.REPOSITORY_CONTENTS:
        set({ currentState: AppStates.HOME });
        break;
      case AppStates.BASE_TRANSLATION:
        set({ currentState: AppStates.REPOSITORY_CONTENTS });
        break;
      case AppStates.ALL_TRANSLATIONS:
        set({ currentState: AppStates.BASE_TRANSLATION });
        break;
    }
  },

  goToHome: () => {
    set({ currentState: AppStates.HOME });
  },

  goToState: (state: AppStates) => {
    set({ currentState: state });
  },

}));

export default useStateStore;
