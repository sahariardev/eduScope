'use client'
import {ReactNode, useState} from "react";
import Link from "next/link";
import {useHeaderStore} from "@/app/hooks/useHeaderStore";
import {useRouter} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";

interface Props {
    children: ReactNode;
}

const CourseLayout = ({children}: Props) => {


    return (
       <div>

       </div>
    );
}


export default CourseLayout;