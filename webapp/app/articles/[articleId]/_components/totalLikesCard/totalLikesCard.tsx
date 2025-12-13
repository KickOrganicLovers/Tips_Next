'use client'

import styles from './totalLikesCard.module.css'
import {IoHeart} from "react-icons/io5";
import {LikeForArticleScheme} from "@/types";

interface props {
    likes: LikeForArticleScheme[]
    like: LikeForArticleScheme | undefined
}
export default function TotalLikesCard(props: props) {
    const className = props.like? `${styles['div_1']} ${styles['active']}` : styles['div_1']



    return (
        <div className={styles.div_0}>
            <div className={className}>
                <IoHeart className={styles.IoHeart}/>
                <p className={styles.p_0}>{props.likes.length}</p>
            </div>
        </div>
    )
}
