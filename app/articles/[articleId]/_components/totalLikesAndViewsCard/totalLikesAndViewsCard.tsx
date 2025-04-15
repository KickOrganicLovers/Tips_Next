import {IoHeart} from "react-icons/io5";
import {ArticleScheme, LikeScheme, LoginStatusScheme, WatchHistoryScheme} from "@/types";
import {LuEye} from "react-icons/lu";
import styles from './totalLikesAndViews.module.css'
import {Dispatch, SetStateAction} from "react";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {editLikes} from "@/redux/slices/loginStatusSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";

interface props {
    article: ArticleScheme,
    loginStatus: LoginStatusScheme,
    like: LikeScheme  | undefined
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}
export default function TotalLikesAndViewsCard(props: props) {
    const className = props.like? `${styles['div_1']} ${styles['active']}` : styles['div_1']
    const dispatch = useDispatch<AppDispatch>();

    const postLike = async () => {
        console.log('this is from postLike')
        return await postDataToServerWithJson<{like: LikeScheme, error: string}>('/api/postLike', {articleId: props.article.id, userId: props.loginStatus.userProfile.userId, like: props.like})
    }

    const clickEventHandler = () => {
        if(props.loginStatus.isLoggedIn){
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
