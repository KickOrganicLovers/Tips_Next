'use client'

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {applyWhereIam} from "@/redux/whereIamSlice";

export default function Page(){
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(applyWhereIam('search'))
    }, [])
    return (
        <div>This is Search</div>
    )
}