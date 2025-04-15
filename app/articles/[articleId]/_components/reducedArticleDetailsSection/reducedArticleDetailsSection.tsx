import {ArticleScheme, FollowScheme, LoginStatusScheme} from "@/types";
import styles from './reducedArticleDetailsSection.module.css'
import {MdCategory} from "react-icons/md";
import classNames from "classnames";
import {Dispatch, SetStateAction} from "react";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {editFollowings} from "@/redux/slices/loginStatusSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {useRouter} from "next/navigation";

interface props {
    article: ArticleScheme
    loginStatus: LoginStatusScheme
    follow: FollowScheme | undefined
    setFollow: Dispatch<SetStateAction<FollowScheme | undefined>>
}

export default function ReducedArticleDetailsSection(props: props) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const postFollow = async () =>{
        return await postDataToServerWithJson<{follow: FollowScheme, error: string}>('/api/postFollow', {following: props.article.authorId, follower: props.loginStatus.userProfile.userId, follow: props.follow})
    }

    const clickEventHandler_postFollow = () => {
        if(props.follow){
            postFollow().then(json => {
                if(json.follow && !json.error){
                    dispatch(editFollowings({following: json.follow, remove: true}))
                }
            })
        }else {
            postFollow().then(json => {
                if(json.follow && !json.error){
                    dispatch(editFollowings({following: json.follow, remove: false}))
                }
            })
        }
    }

    const clickEventHandler_pushToAuthorProfilePage = () => {
        router.push(`/userProfile/${props.article.authorId}`)
    }

    const clickEventHandler_pushToTagPage = (tagName: string) => {
        router.push(`/tags/${tagName}`)
    }


    return(
        <div className={styles.div_0}>
            <h2>記事の情報</h2>
            <div className={styles.div_8}>
                <div className={styles.div_1}>
                    <img src={props.article.authorProfile.profileImageUrl} alt={'authorProfile'}
                         className={styles.img_0}/>
                    <div className={styles.div_2}>
                        <div className={styles.div_3}
                             onClick={clickEventHandler_pushToAuthorProfilePage}>{props.article.authorProfile.username}</div>
                        <div className={styles.div_4}>{props.article.authorProfile.followers.length}フォロワー</div>
                    </div>
                    {(() => props.loginStatus.isLoggedIn ? <button
                        className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                        onClick={clickEventHandler_postFollow}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
                </div>
                <div className={styles.div_5}>
                    <MdCategory className={styles.MdCategory}/>{props.article.category.categoryName}
                </div>
                <div className={styles.div_6}>
                    {props.article.tags.map((tag, index) =>
                        (<div className={styles.div_7} key={index} onClick={() => {
                            clickEventHandler_pushToTagPage(tag.tagName)
                        }}>
                            <p className={styles.p_0}>＃</p><p className={styles.p_1}>{tag.tagName}</p>
                        </div>))}
                </div>
            </div>
        </div>
    )

}
