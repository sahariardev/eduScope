import {create} from 'zustand';

export const useNavbarStore = create((set) => ({
    navbarUrls: [
        {
            href: '/dashboard',
            title: 'Dashboard'
        },
        {
            href: '/course',
            title: 'Course',
            adminUrl: true
        },
        {
            href: '/lesson',
            title: 'Lesson',
            adminUrl: true
        },
        {
            href: '/video',
            title: 'Video',
            adminUrl: true
        }
    ],
    updateNavbarList: (urls) => set({navbarUrls: urls})
}));