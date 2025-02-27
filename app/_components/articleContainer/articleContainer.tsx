import {ArticleScheme, CategoryScheme, UserProfileScheme} from "@/typs";
import {useEffect, useState} from "react";
import styles from './articleContainer.module.css'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {MdCategory} from "react-icons/md";
import {useRouter} from "next/navigation";

interface props {
    article: ArticleScheme;
    authorProfile: UserProfileScheme;
}

export default function ArticleContainer(props: props) {
    const [isMounted, setIsMounted] = useState(false);
    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)
    const className = isMounted ? `${styles['div_0']} ${styles['active']}` : styles['div_0'];
    const router = useRouter();

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
        return undefined;
    }

    const clickEventHandler = () => {
        router.push(`/articles/${props.article.id}`)
    }





    useEffect(() => {
        setIsMounted(true)
    })
    return (
        <div className={className} onClick={clickEventHandler}>
            <div className={styles.div_1}>
                <img className={styles.img_0} alt={'fuck'} src={props.article.thumbnailImageUrl}/>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>{props.article.title}</p>
                <div className={styles.div_3}>
                    <div className={styles.div_4}>
                        <img className={styles.img_1} src={props.authorProfile.profileImageUrl} alt={'author-img'}/>
                        <p className={styles.p_1}>{props.authorProfile.username}</p>
                    </div>
                    <div className={styles.div_4}>
                        <MdCategory className={styles.MdCategory}/>
                        <p className={styles.p_2}>{
                            findCategoryById(Categories, props.article.categoryId)?.category
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
