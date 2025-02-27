import styles from './articleDetailsSection.module.css'
import {ArticleScheme, CategoryScheme, UserProfileScheme} from "@/typs";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface props {
    article: ArticleScheme
    authorProfile: UserProfileScheme
}

export default function ArticleDetailsSection(props: props) {
    const Categories = useSelector<RootState, RootState['Categories']>(state => state.Categories)

    const findCategoryById = (categories: CategoryScheme[], id: number): CategoryScheme | undefined => {
        for (const category of categories) {
            if (category.id === id) {
                return category;
            }
            if (category.children) {
                const found = findCategoryById(category.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return
    }

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_1}><a className={styles.a_0}>{findCategoryById(Categories, findCategoryById(Categories, props.article.categoryId)?.parentId as number)?.category}</a>{' > '}<a className={styles.a_0}>{findCategoryById(Categories, props.article.categoryId)?.category}</a></p>
                {/*<h3 className={styles.h3_0}></h3>*/}
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>この記事の作成者</p>
                <img src={props.authorProfile.profileImageUrl} className={styles.img_0} alt={'authorProfile'}/>
                <h2>{props.authorProfile.username}</h2>
                <p className={styles.p_2}>{props.authorProfile.introduction}</p>
            </div>
            <div className={styles.div_3}>
                {props.article.tags.map((tag, index) => <div className={styles.div_4} key={index}><p className={styles.p_3}>＃</p><p
                    className={styles.p_4}>{tag}</p></div>)}
            </div>
        </div>
    )
}
