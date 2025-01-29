import {create} from 'zustand';

export const useNavbarStore = create((set) => ({
    navbarUrls: [
        {
            href: '/dashboard',
            title: 'Dashboard'
        },
        {
            href: '/course',
            title: 'Course'
        },
        {
            href: '/lesson',
            title: 'Lesson'
        }
    ],
    updateNavbarList: (urls) => set({navbarUrls: urls})
}));