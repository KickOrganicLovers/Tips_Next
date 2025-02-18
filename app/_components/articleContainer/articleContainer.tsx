import {ArticleScheme, Category} from "@/typs";
import {useEffect, useState} from "react";
import styles from './articleContainer.module.css'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {MdCategory} from "react-icons/md";
import {useRouter} from "next/navigation";

export default function ArticleContainer(props: ArticleScheme) {
    const [isMounted, setIsMounted] = useState(false);
    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)
    const className = isMounted ? `${styles['div_0']} ${styles['active']}` : styles['div_0'];
    const router = useRouter();

    const findCategoryById = (categories: Category[], id: number): Category | undefined => {
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
        router.push(`/articles/${props.id}`)
    }





    useEffect(() => {
        setIsMounted(true)
    })
    return (
        <div className={className} onClick={clickEventHandler}>
            <div className={styles.div_1}>
                <img className={styles.img_0} alt={'fuck'} src={props.thumbnailImageUrl}/>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>{props.title}</p>
                <div className={styles.div_3}>
                    <div className={styles.div_4}>
                        <img className={styles.img_1} src={props.authorProfileImageUrl} alt={'author-img'}/>
                        <p className={styles.p_1}>{props.authorName}</p>
                    </div>
                    <div className={styles.div_4}>
                        <MdCategory className={styles.MdCategory}/>
                        <p className={styles.p_2}>{
                            findCategoryById(Categories, props.categoryId)?.category
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
