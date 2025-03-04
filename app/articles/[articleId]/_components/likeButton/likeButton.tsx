import {IoHeart} from "react-icons/io5";
import styles from './likeButton.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

interface props {
    articleId: number
    userId: number
    isLiked: boolean | undefined
    setIsLiked: Dispatch<SetStateAction<boolean | undefined>>
}

export default function LikeButton(props: props) {
    const className = props.isLiked? `${styles['IoHeart']} ${styles['active']}` : styles['IoHeart']

    useEffect(() => {

    }, [props.articleId, props.userId])

    const postLike = async () => {
        console.log('this is from postLike')
        return await postDataToServerWithJson<{isPosted: boolean, error: string}>('/api/postLike', {articleId: props.articleId, userId: props.userId, isLiked: props.isLiked})
    }

    const clickEventHandler = useCallback(async () => {
        const newLike = !props.isLiked
        props.setIsLiked(newLike)
        try {
            const json = await postLike()
            if(!json.isPosted || !!json.error){
                props.setIsLiked(!newLike)
                return
            }
        }catch(err){
            props.setIsLiked(!newLike)
        }

    }, [props.articleId, props.userId, props.isLiked])

    return (
        <div className={styles.div_0}>
            <IoHeart className={className} onClick={clickEventHandler}/>
        </div>
    )
}
