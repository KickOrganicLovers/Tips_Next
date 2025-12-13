import {AiOutlineClose} from "react-icons/ai";
import styles from './tag.module.css'
import {Dispatch, SetStateAction} from "react";
import {ArticleSchemeWithPrefix} from "@/types";

interface props {
    tagName: string
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
    index: number
    setError: Dispatch<SetStateAction<string>>
}

export default function Tag(props: props) {
    const clickEventHandler = () => {
        props.setArticleOnEdit((prevState) => ({
            ...prevState,
            tags: prevState.tags.filter((_, index) => index !== props.index)
        }))
        props.setError('');
    }

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>＃</p>
            <p className={styles.p_1}>
                {props.tagName}
            </p>
            <AiOutlineClose className={styles.AiOutlineClose} onClick={clickEventHandler}/>
        </div>
    )
}
