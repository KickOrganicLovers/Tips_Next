import {ArticleScheme, CommentScheme, LoginStatusScheme} from "@/types";
import styles from './commentInsertionCard.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import classNames from "classnames";

interface props {
    loginStatus: LoginStatusScheme
    article: ArticleScheme
    setComments: Dispatch<SetStateAction<CommentScheme[]>>;
}

export default function CommentInsertionCard(props: props) {
    const [contents, setContents] = useState<string>('')

    const postComment = async () => {
        return await postDataToServerWithJson<{postedComment: CommentScheme, error: string}>('/api/postComment', {articleId: props.article.id, userId: props.loginStatus.userProfile.userId, contents: contents})
    }


    const clickEventHandler_check = () => {
        if(!!contents){
            postComment().then((json) => {
                if(json.postedComment && !json.error){
                    props.setComments((prevComments) => [...prevComments, json.postedComment])
                    setContents('')
                }
            }).catch((error) => {
                window.console.log(error)
            })
        }
    }

    const clickEventHandler_close = () => {
        if(!!contents){
            setContents('')
        }
    }


    return (
        <div className={styles.div_0}>
            <img src={props.loginStatus.userProfile.profileImageUrl} alt={'userProfile'} className={styles.img_0}/>
            <TextareaAutosize className={styles.textarea_0} value={contents} placeholder={props.loginStatus.userProfile.username + 'としてコメントを投稿'} onChange={(e) => {setContents(e.target.value)}}/>
            <div className={styles.div_1}>
                <AiOutlineCheck className={(() => contents? classNames(styles.AiOutlineCheck, styles.active) : classNames(styles.AiOutlineCheck))()} onClick={clickEventHandler_check}/>
                <AiOutlineClose className={(() => contents? classNames(styles.AiOutlineClose, styles.active) : classNames(styles.AiOutlineClose))()} onClick={clickEventHandler_close}/>
            </div>
        </div>
    )
}
