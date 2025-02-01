import {create} from 'zustand';

export const useCourseInfoStore = create((set) => ({
    currentCourse: {},
    updateCurrentCourse: (course) => set({currentCourse: course})
}));