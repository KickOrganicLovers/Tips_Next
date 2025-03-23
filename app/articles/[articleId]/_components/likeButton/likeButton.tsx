import {IoHeart} from "react-icons/io5";
import styles from './likeButton.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {ArticleScheme, LikeScheme} from "@/types";
import {editFollowings, editLikes} from "@/redux/slices/loginStatusSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";

interface props {
    articleId: string
    userId: string
    like: LikeScheme | undefined
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}

export default function LikeButton(props: props) {
    const className = props.like? `${styles['IoHeart']} ${styles['active']}` : styles['IoHeart']
    const dispatch = useDispatch<AppDispatch>();

    const postLike = async () => {
        console.log('this is from postLike')
        return await postDataToServerWithJson<{like: LikeScheme, error: string}>('/api/postLike', {articleId: props.articleId, userId: props.userId, like: props.like})
    }

    const clickEventHandler = () => {
        if(!props.like){
            postLike().then(json => {
                if(json.like && !json.error){
                    props.setArticle((prevState) => ({...prevState, likes: [...prevState.likes, json.like]}))
                    dispatch(editLikes({like: json.like, remove: false}))
                }
            })
        }else {
            postLike().then(json => {
                if(json.like && !json.error){
                    props.setArticle((prevState) => ({...prevState, likes: prevState.likes.filter((like) => like.id !== json.like.id)}))
                    dispatch(editLikes({like: json.like, remove: true}))
                }
            })
        }
    }

    return (
        <div className={styles.div_0}>
            <IoHeart className={className} onClick={clickEventHandler}/>
        </div>
    )
}
