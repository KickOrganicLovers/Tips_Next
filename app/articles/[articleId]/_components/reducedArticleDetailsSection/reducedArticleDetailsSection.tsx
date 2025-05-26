import {ArticleScheme, FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import styles from './reducedArticleDetailsSection.module.css'
import {MdCategory} from "react-icons/md";
import classNames from "classnames";
import {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";

interface props {
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
    userProfile: UserProfileScheme
    follow: FollowScheme | undefined
}

export default function ReducedArticleDetailsSection(props: props) {
    const postFollowing = useUserProfileStore(state => state.postFollowing)
    const session = useSession()
    const router = useRouter();

    const setUserProfile: Dispatch<SetStateAction<UserProfileScheme>> = (newUserProfileOrAdapter) => {
        props.setArticle((prevState) => {
            if(typeof newUserProfileOrAdapter === "function"){
                const updater = newUserProfileOrAdapter as (prevState: UserProfileScheme) => UserProfileScheme;
                return {
                    ...prevState,
                    authorProfile: updater(prevState.authorProfile),
                }
            }else {
                return {
                    ...prevState,
                    authorProfile: newUserProfileOrAdapter
                }
            }
        })
    }


    const clickEventHandler_postFollow = () => {
        postFollowing(session, props.article.authorId, props.follow, setUserProfile)
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
                    {(() => session.status === 'authenticated'? <button
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
