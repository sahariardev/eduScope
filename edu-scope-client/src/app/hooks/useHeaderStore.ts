import {create} from 'zustand';

export const useHeaderStore = create((set) => ({
    headerName: 'Dashboard',
    updateHeaderName: (name) => set({headerName: name})
}));