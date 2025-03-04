import {IoHeart} from "react-icons/io5";
import styles from './likeButton.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {useEffect, useState} from "react";

interface props {
    articleId: number
    userId: number
}

export default function LikeButton(props: props) {
    const [isLiked, setIsLiked] = useState(false)
    const className = isLiked? `${styles['IoHeart']} ${styles['active']}` : styles['IoHeart']

    useEffect(() => {

    }, [props.articleId, props.userId])

    const postLike = async () => {
        console.log('this is from postLike')
        return await postDataToServerWithJson<{isPosted: boolean, error: string}>('/api/postLike', {articleId: props.articleId, userId: props.userId})
    }

    const clickEventHandler = () => {
        postLike().then((json) => {
            console.log(json)
            if(json.isPosted){
                setIsLiked(true)
            }
        })
    }

    return (
        <IoHeart className={className} onClick={clickEventHandler}/>
    )
}
