import styles from './articleDetailsSection.module.css'
import {ArticleScheme, FollowScheme, UserScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";
import classNames from "classnames";
import {useRouter} from "next/navigation";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {findCategoryById} from "@/lib/lib-client/processing";
import {useCategoriesStore} from "@/lib/lib-client/stores/categoriesStore";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";
import Link from "next/link";

interface props {
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
    follow: FollowScheme | undefined
}

export default function ArticleDetailsSection(props: props) {
    const categories = useCategoriesStore(state => state.categories)
    const postFollowing = useUserStore((state) => state.postFollowing)
    const session = useSession()
    const router = useRouter();

    const setUser: Dispatch<SetStateAction<UserScheme>> = (newUserOrAdapter) => {
        props.setArticle((prevState) => {
            if(typeof newUserOrAdapter === "function"){
                const updater = newUserOrAdapter as (prevState: UserScheme) => UserScheme;
                return {
                    ...prevState,
                    author: updater(prevState.author),
                }
            }else {
                return {
                    ...prevState,
                    author: newUserOrAdapter
                }
            }
        })
    }


    const clickEventHandler_postFollowing = () => {
        postFollowing(session, props.article.authorId, props.follow, setUser)
    }

    const clickEventHandler_pushToAuthorPage = () => {
        router.push(`/user/${props.article.authorId}`)
    }

    const clickEventHandler_pushToTagPage = (tagName: string) => {
        router.push(`/tags/${tagName}`)
    }



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_1}>
                    {findCategoryById(categories, findCategoryById(categories, props.article.categoryId)?.parentId as string)?.categoryName}{' > '}
                    <Link href={`/categories/${findCategoryById(categories, props.article.categoryId)?.id}`} className={styles.Link_0}>{findCategoryById(categories, props.article.categoryId)?.categoryName}</Link>
                </p>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>この記事の作成者</p>
                <img src={props.article.author.image} className={styles.img_0} alt={'author'} onClick={clickEventHandler_pushToAuthorPage}/>
                <h2 className={styles.h2_0} onClick={clickEventHandler_pushToAuthorPage}>{props.article.author.name}</h2>
                <TotalFollowCard user={props.article.author}/>
                <div className={styles.div_5}><div className={styles.div_6}>{props.article.author.introduction}</div></div>
                {(() => session.status === 'authenticated'? <button
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
