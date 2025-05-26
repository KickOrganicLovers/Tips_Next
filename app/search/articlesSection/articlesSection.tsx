import styles from './articlesSection.module.css'
import {ArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";


interface props {
    articles: ArticleScheme[]
    pageMode: 'articles' | 'users'
}

export default function ArticlesSection(props: props) {
    return (
        <div className={styles.div_0} style={props.pageMode !== 'articles' ? {display: "none"} : {}}>
            {props.articles.map((article: ArticleScheme, index: number) => <ReducedArticleContainer article={article} key={index}/>)}
        </div>
    )
}
