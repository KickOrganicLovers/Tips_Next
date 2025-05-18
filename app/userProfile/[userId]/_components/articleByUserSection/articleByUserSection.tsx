import styles from './articleByUserSection.module.css'
import {ArticleScheme, UserProfileScheme} from "@/types";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";


interface props {
    userProfile?: UserProfileScheme
}

export default function ArticleByUserSection(props: props) {

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>作成した記事</h2>
            <div className={styles.div_1}>
                {props.userProfile?.articleCreatedBy.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index}/>)}
            </div>
        </div>
    )
}
