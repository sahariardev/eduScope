import {create} from 'zustand';

type HeaderStore = {
    headerName: string;
    updateHeaderName: (name: string) => void;
  };

export const useHeaderStore = create<HeaderStore>((set) => ({
    headerName: 'Dashboard',
    updateHeaderName: (name: string) => set({headerName: name})
}));