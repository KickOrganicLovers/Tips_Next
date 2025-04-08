import styles from './articleDetailsSection.module.css'
import {ArticleScheme, CategoryScheme, FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {editFollowings} from "@/redux/slices/loginStatusSlice";
import {useRouter} from "next/navigation";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {findCategoryById} from "@/lib-client/processing";

interface props {
    article: ArticleScheme
    loginStatus: LoginStatusScheme
    follow: FollowScheme | undefined
    setFollow: Dispatch<SetStateAction<FollowScheme | undefined>>
}

export default function ArticleDetailsSection(props: props) {
    const Categories = useSelector<RootState, RootState['Categories']>(state => state.Categories)
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



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_1}><a className={styles.a_0}>{findCategoryById(Categories, findCategoryById(Categories, props.article.categoryId)?.parentId as string)?.categoryName}</a>{' > '}<a className={styles.a_0}>{findCategoryById(Categories, props.article.categoryId)?.categoryName}</a></p>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>この記事の作成者</p>
                <img src={props.article.authorProfile.profileImageUrl} className={styles.img_0} alt={'authorProfile'}/>
                <h2 className={styles.h2_0} onClick={clickEventHandler_pushToAuthorProfilePage}>{props.article.authorProfile.username}</h2>
                <TotalFollowCard userProfile={props.article.authorProfile}/>
                <p className={styles.p_2}>{props.article.authorProfile.introduction}</p>
                {(() => props.loginStatus.isLoggedIn ? <button
                    className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                    onClick={clickEventHandler_postFollow}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
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
