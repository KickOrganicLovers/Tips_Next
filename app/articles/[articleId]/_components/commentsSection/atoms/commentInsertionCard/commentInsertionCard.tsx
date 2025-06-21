import {ArticleScheme, CommentScheme, UserScheme} from "@/types";
import styles from './commentInsertionCard.module.css'
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {Dispatch, SetStateAction, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import classNames from "classnames";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {SessionContextValue, useSession} from "next-auth/react";

interface props {
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>;
}

export default function CommentInsertionCard(props: props) {
    const [contents, setContents] = useState<string>('')
    const postComment = useUserStore(state => state.postComment)
    const session = useSession()

    const clickEventHandler_check = () => {
        postComment(session, props.article.id, contents, props.setArticle)
        setContents('')
    }

    const clickEventHandler_close = () => {
        if(!!contents){
            setContents('')
        }
    }


    return (
        <div className={styles.div_0}>
            <img src={session.data?.user.image as string} alt={'user'} className={styles.img_0}/>
            <TextareaAutosize className={styles.textarea_0} value={contents} placeholder={session.data?.user.name + 'としてコメントを投稿'} onChange={(e) => {setContents(e.target.value)}}/>
            <div className={styles.div_1}>
                <AiOutlineCheck className={(() => contents? classNames(styles.AiOutlineCheck, styles.active) : classNames(styles.AiOutlineCheck))()} onClick={clickEventHandler_check}/>
                <AiOutlineClose className={(() => contents? classNames(styles.AiOutlineClose, styles.active) : classNames(styles.AiOutlineClose))()} onClick={clickEventHandler_close}/>
            </div>
        </div>
    )
}
