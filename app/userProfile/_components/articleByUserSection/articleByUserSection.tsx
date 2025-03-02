import styles from './articleByUserSection.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, LoginStatusScheme, UserProfileScheme} from "@/typs";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import ArticleContainer from "@/app/_components/articleContainer/articleContainer";
import {produceWithPatches} from "immer";


interface props {
    loginStatus: LoginStatusScheme
}

export default function ArticleByUserSection(props: props) {
    const [articlesByUser, setArticleByUser] = useState<{article: ArticleScheme, authorProfile: UserProfileScheme}[]>([])

    const getArticlesByUser = async () => {
        const json = await getDataFromServerWithJson<{articlesWithAuthorProfile: {article: ArticleScheme, authorProfile: UserProfileScheme}[], error?: string}>(`api/getArticles?authorId=${props.loginStatus.userProfile.userId}`)
        console.log(json)
        if(!json.error) {
            console.log(json.articlesWithAuthorProfile)
            return json.articlesWithAuthorProfile
        }else {
            return []
        }
    }


    useEffect(() => {
        getArticlesByUser().then((articles) => {
            setArticleByUser(articles)
        })
    }, [props.loginStatus.userProfile.userId])


    return (
        <div className={styles.div_0}>
            {articlesByUser.map(({article, authorProfile}, index) => <ArticleContainer article={article} authorProfile={authorProfile} key={index}/>)}
        </div>
    )
}
