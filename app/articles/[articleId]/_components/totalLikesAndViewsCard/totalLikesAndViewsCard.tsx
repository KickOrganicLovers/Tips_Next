import {IoHeart} from "react-icons/io5";
import {ArticleScheme, LikeForArticleScheme} from "@/types";
import {LuEye} from "react-icons/lu";
import styles from './totalLikesAndViews.module.css'
import {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";

interface props {
    article: ArticleScheme,
    like: LikeForArticleScheme | undefined
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}
export default function TotalLikesAndViewsCard(props: props) {
    const postLikeForArticle = useUserStore(state => state.postLikeForArticle)
    const className = props.like? `${styles['div_1']} ${styles['active']}` : styles['div_1']
    const session = useSession();

    const clickEventHandler = () => {
        postLikeForArticle(session, props.article.id, props.like, props.setArticle)
    }

    return (
        <div className={styles.div_0}>
            <div className={className} onClick={clickEventHandler}>
                <IoHeart className={styles.IoHeart}/>
                <p className={styles.p_0}>{props.article.likes.length}</p>
            </div>
            <div className={styles.div_1}>
                <LuEye className={styles.LuEye}/>
                <p className={styles.p_0}>{props.article.watchHistories.length}</p>
            </div>
        </div>
    )
}
