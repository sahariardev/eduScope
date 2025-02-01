'use client'
import React, {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useRouter} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";
import axios from "axios";
import {GET_ONE_COURSE_URL} from "@/app/constant";
import {useNavbarStore} from "@/app/hooks/useNavbarStore";
import {useCourseInfoStore} from "@/app/hooks/useCourseInfoStore";


const CourseLayout = ({children, params}) => {
    const resolvedParams = React.use(params);
    const {updateHeaderName} = useHeaderStore();
    const {updateNavbarList} = useNavbarStore();
    const {updateCurrentCourse} = useCourseInfoStore();

    useEffect(() => {
        updateHeaderName('Course')
    }, []);


    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(GET_ONE_COURSE_URL + resolvedParams.id, {withCredentials: true});
            const course = response.data;

            updateHeaderName(course.title);
            updateCurrentCourse(course);
            updateNavbarList(course.lessons.map(lesson => {
                return {
                    href: `/videoCourse/${resolvedParams.id}/lesson/${lesson.id}`,
                    title: lesson.title

                }
            }));
        }

        fetchCourse();
    }, [resolvedParams.id]);

    return (
       <div>
           {children}
       </div>
    );
}


export default CourseLayout;