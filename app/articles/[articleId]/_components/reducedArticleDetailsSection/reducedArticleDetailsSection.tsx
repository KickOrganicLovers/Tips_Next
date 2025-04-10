import {ArticleScheme} from "@/types";
import styles from './reducedArticleDetailsSection.module.css'

interface props {
    article: ArticleScheme
}

export default function ReducedArticleDetailsSection(props: props) {
    return(
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src={props.article.authorProfile.profileImageUrl} alt={'authorProfile'} />

            </div>
        </div>
    )

}
