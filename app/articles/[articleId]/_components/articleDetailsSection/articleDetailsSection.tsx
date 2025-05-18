import styles from './articleDetailsSection.module.css'
import {ArticleScheme, FollowScheme, LoginStatusScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";
import classNames from "classnames";
import {useRouter} from "next/navigation";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {findCategoryById} from "@/lib/lib-client/processing";
import loginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import useCategoriesStore from "@/lib/lib-client/stores/categoriesStore";

interface props {
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
    loginStatus: LoginStatusScheme
    follow: FollowScheme | undefined
}

export default function ArticleDetailsSection(props: props) {
    const categories = useCategoriesStore(state => state.categories)
    const postFollowing = loginStatusStore((state) => state.postFollowing)
    const router = useRouter();


    const clickEventHandler_postFollowing = () => {
        postFollowing(props.article.authorId, props.follow, props.setArticle)
    }

    const clickEventHandler_pushToAuthorProfilePage = () => {
        router.push(`/userProfile/${props.article.authorId}`)
    }

    const clickEventHandler_pushToTagPage = (tagName: string) => {
        router.push(`/tags/${tagName}`)
    }



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_1}><a
                    className={styles.a_0}>{findCategoryById(categories, findCategoryById(categories, props.article.categoryId)?.parentId as string)?.categoryName}</a>{' > '}<a
                    className={styles.a_0}>{findCategoryById(categories, props.article.categoryId)?.categoryName}</a>
                </p>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>この記事の作成者</p>
                <img src={props.article.authorProfile.profileImageUrl} className={styles.img_0} alt={'authorProfile'}/>
                <h2 className={styles.h2_0} onClick={clickEventHandler_pushToAuthorProfilePage}>{props.article.authorProfile.username}</h2>
                <TotalFollowCard userProfile={props.article.authorProfile}/>
                <p className={styles.p_2}>{props.article.authorProfile.introduction}</p>
                {(() => props.loginStatus.isLoggedIn ? <button
                    className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                    onClick={clickEventHandler_postFollowing}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
            </div>
            <div className={styles.div_3}>
                {props.article.tags.map((tag, index) =>
                    <div className={styles.div_4} key={index} onClick={() => {clickEventHandler_pushToTagPage(tag.tagName)}}>
                        <p className={styles.p_3}>＃</p>
                        <p className={styles.p_4}>{tag.tagName}</p>
                    </div>)}
            </div>
        </div>
    )
}
