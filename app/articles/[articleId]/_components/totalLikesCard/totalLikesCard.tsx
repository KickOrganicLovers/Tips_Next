'use client'

import styles from './totalLikesCard.module.css'
import {IoHeart} from "react-icons/io5";
import {LikeScheme} from "@/types";
import {useEffect, useRef, useState} from "react";

interface props {
    likes: LikeScheme[]
    isLiked: boolean | undefined
}
export default function TotalLikesCard(props: props) {
    const [isLiked_initial, setIsLiked_initial] = useState<boolean | undefined>(undefined)
    const [isLikedAsNum, setIsLikedAsNum] = useState(0)
    const changeCount = useRef(0);
    const className = props.isLiked? `${styles['div_1']} ${styles['active']}` : styles['div_1']

    useEffect(() => {
        if (changeCount.current < 2) {
            if(changeCount.current === 1) {
                setIsLiked_initial(props.isLiked)
            }
            changeCount.current += 1;
            return;
        }

        if(isLiked_initial) {
            setIsLikedAsNum(props.isLiked ? 0 : -1);
        }else {
            setIsLikedAsNum(props.isLiked ? 1 : 0);
        }
        console.log("isLiked changed after initial setup:", props.isLiked);
    }, [props.isLiked]);


    return (
        <div className={styles.div_0}>
            <div className={className}>
                <IoHeart className={styles.IoHeart}/>
                <p className={styles.p_0}>{props.likes.length + isLikedAsNum}</p>
            </div>
        </div>
    )
}
