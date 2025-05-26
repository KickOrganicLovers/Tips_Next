import styles from './commentCard.module.css'
import {ArticleScheme, CommentScheme, LikeForCommentScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useSession} from "next-auth/react";

interface props {
    userProfile: UserProfileScheme
    comment: CommentScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}
export default function CommentCard(props: props) {
    const [like, setLike] = useState<LikeForCommentScheme | undefined>()
    const session = useSession()
    const postLikeForComment = useUserProfileStore(state => state.postLikeForComment)
    const className = !!like ? classNames(styles.div_2, styles.active) : classNames(styles.div_2)


    const checkIsLiked = (likes: LikeForCommentScheme[]) => {
        const like = likes.filter((like) => like.userId === props.userProfile.userId)
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
                <img src={props.comment.userProfile?.profileImageUrl} alt={'userProfile'} className={styles.img_0}/>
                <p className={styles.p_0}>{props.comment.userProfile?.username}</p>
            </div>
            <p>
                {props.comment.contents}
            </p>
            <div className={className} onClick={clickEventHandler}>
                <IoHeart className={styles.IoHeart}/>
                <p className={styles.p_1}>{props.comment.likes.length}</p>
            </div>
        </div>
    )

}
