import {IoHeart} from "react-icons/io5";
import styles from './likeButton.module.css'
import {Dispatch, SetStateAction} from "react";
import {ArticleScheme, LikeForArticleScheme} from "@/types";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";

interface props {
    isLoggedIn: boolean,
    articleId: string
    like: LikeForArticleScheme | undefined
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}

export default function LikeButton(props: props) {
    const postLikeForArticle = useUserStore((state) => state.postLikeForArticle)
    const session = useSession();
    const className = props.like? `${styles['IoHeart']} ${styles['active']}` : styles['IoHeart']


    const clickEventHandler = () => {
        postLikeForArticle(session, props.articleId, props.like, props.setArticle)
    }

    return (
        <div className={styles.div_0}>
            <IoHeart className={className} onClick={clickEventHandler}/>
        </div>
    )
}
