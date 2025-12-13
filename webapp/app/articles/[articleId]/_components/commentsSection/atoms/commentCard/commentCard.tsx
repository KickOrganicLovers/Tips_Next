import styles from './commentCard.module.css'
import {ArticleScheme, CommentScheme, LikeForCommentScheme, UserScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {SessionContextValue, useSession} from "next-auth/react";

interface props {
    comment: CommentScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}
export default function CommentCard(props: props) {
    const [like, setLike] = useState<LikeForCommentScheme | undefined>()
    const session = useSession()
    const postLikeForComment = useUserStore(state => state.postLikeForComment)
    const className = !!like ? classNames(styles.div_2, styles.active) : classNames(styles.div_2)


    const checkIsLiked = (likes: LikeForCommentScheme[]) => {
        const like = likes.filter((like) => like.userId === session.data?.user.id)
        if(like.length > 0){
            setLike(like[0]);
        }else {
            setLike(undefined)
        }
    }

    const clickEventHandler = () => {
        postLikeForComment(session, props.comment.id, like, props.setArticle)
    }

    useEffect(() => {
        checkIsLiked(props.comment.likes)
    }, [props.comment]);

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div className={styles.div_3}>
                    <img src={props.comment.user?.image} alt={'user'} className={styles.img_0}/>
                    <p className={styles.p_0}>{props.comment.user?.name}</p>
                </div>
                <div className={className} onClick={clickEventHandler}>
                    <IoHeart className={styles.IoHeart}/>
                    <p className={styles.p_1}>{props.comment.likes.length}</p>
                </div>
            </div>
            <p>
                {props.comment.contents}
            </p>
        </div>
    )

}
