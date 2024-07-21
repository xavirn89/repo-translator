import { create } from 'zustand';
import { AppStates } from '@/types/global';

interface StateStoreState {
  currentState: AppStates;
  goToState: (state: AppStates) => void;
}

const useStateStore = create<StateStoreState>((set, get) => ({
  currentState: AppStates.HOME,
  goToState: (state: AppStates) => {
    set({ currentState: state });
  },

}));

export default useStateStore;
