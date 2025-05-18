import {IoHeart} from "react-icons/io5";
import styles from './likeButton.module.css'
import {Dispatch, SetStateAction} from "react";
import {ArticleScheme, LikeForArticleScheme} from "@/types";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

interface props {
    isLoggedIn: boolean,
    articleId: string
    like: LikeForArticleScheme | undefined
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}

export default function LikeButton(props: props) {
    const postLikeForArticle = useLoginStatusStore((state) => state.postLikeForArticle)
    const className = props.like? `${styles['IoHeart']} ${styles['active']}` : styles['IoHeart']


    const clickEventHandler = () => {
        postLikeForArticle(props.articleId, props.like, props.setArticle)
    }

    return (
        <div className={styles.div_0}>
            <IoHeart className={className} onClick={clickEventHandler}/>
        </div>
    )
}
