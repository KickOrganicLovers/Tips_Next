import {ArticleScheme, FollowScheme, LoginStatusScheme} from "@/types";
import styles from './reducedArticleDetailsSection.module.css'
import {MdCategory} from "react-icons/md";
import classNames from "classnames";
import {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

interface props {
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
    loginStatus: LoginStatusScheme
    follow: FollowScheme | undefined
}

export default function ReducedArticleDetailsSection(props: props) {
    const postFollowing = useLoginStatusStore(state => state.postFollowing)
    const router = useRouter();


    const clickEventHandler_postFollow = () => {
        postFollowing(props.article.authorId, props.follow, props.setArticle)
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
