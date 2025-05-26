import {ArticleScheme, CommentScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import styles from './commentInsertionCard.module.css'
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {Dispatch, SetStateAction, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import classNames from "classnames";

interface props {
    userProfile: UserProfileScheme
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>;
}

export default function CommentInsertionCard(props: props) {
    const [contents, setContents] = useState<string>('')

    const postComment = async () => {
        return await postDataToServerWithJson<{postedComment: CommentScheme, error: string}>('/api/postComment', {articleId: props.article.id, userId: props.userProfile?.userId, contents: contents})
    }


    const clickEventHandler_check = () => {
        if(!!contents){
            postComment().then((json) => {
                if(json.postedComment && !json.error){
                    props.setArticle(prevState => ({
                        ...prevState,
                        comments: [...prevState.comments, json.postedComment]
                    }))
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
            <img src={props.userProfile.profileImageUrl} alt={'userProfile'} className={styles.img_0}/>
            <TextareaAutosize className={styles.textarea_0} value={contents} placeholder={props.userProfile?.username + 'としてコメントを投稿'} onChange={(e) => {setContents(e.target.value)}}/>
            <div className={styles.div_1}>
                <AiOutlineCheck className={(() => contents? classNames(styles.AiOutlineCheck, styles.active) : classNames(styles.AiOutlineCheck))()} onClick={clickEventHandler_check}/>
                <AiOutlineClose className={(() => contents? classNames(styles.AiOutlineClose, styles.active) : classNames(styles.AiOutlineClose))()} onClick={clickEventHandler_close}/>
            </div>
        </div>
    )
}
