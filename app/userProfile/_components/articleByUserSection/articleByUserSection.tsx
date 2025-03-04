import styles from './articleByUserSection.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import ArticleContainer from "@/app/_components/articleContainer/articleContainer";
import {produceWithPatches} from "immer";


interface props {
    loginStatus: LoginStatusScheme
}

export default function ArticleByUserSection(props: props) {
    const [articlesByUser, setArticleByUser] = useState<ArticleScheme[]>([])

    const getArticlesByUser = async () => {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[], error?: string}>(`api/getArticles?authorId=${props.loginStatus.userProfile.userId}`)
        console.log(json)
        if(!json.error) {
            console.log(json.articles)
            return json.articles
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
            {articlesByUser.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index}/>)}
        </div>
    )
}
