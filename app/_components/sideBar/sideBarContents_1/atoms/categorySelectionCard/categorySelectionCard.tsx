import {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from './categorySelectionCard.module.css'
import {ArticleSchemeWithPrefix, CategoryScheme} from "@/types";
import {MdArrowForwardIos} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
import useCategoriesStore from "@/lib/lib-client/stores/categoriesStore";

interface props{
    category?: CategoryScheme,
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
}
export default function CategorySelectionCard(props: props) {
    const categories = useCategoriesStore(state => state.categories);
    const [parentCategoryIdOnFocus, setParentCategoryIdOnFocus] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const className = !!parentCategoryIdOnFocus ? `${styles['div_2']} ${styles['shifted']}` : `${styles['div_2']}`

    useEffect(() => {
        if (!!props.category) setCategoryName(props.category?.categoryName);
    }, [props]);

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>
                選択したカテゴリー
                <mark className={styles.mark_0}>{categoryName}</mark>
            </p>
            <div className={styles.div_1}>
                <div className={className}>
                    <div className={styles.div_3}>
                        {categories.map((category, index) => (
                            <div className={styles.div_4} key={index} onClick={() => {
                                setParentCategoryIdOnFocus(category.id)
                            }}>
                                <div className={styles.div_5}>
                                    {category.categoryName}
                                </div>
                                <MdArrowForwardIos className={styles.MdArrowForwardIos}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.div_3}>
                        {(() => {
                            const parent = categories.filter((category, index) => category.id === parentCategoryIdOnFocus)[0]
                            if (!!parent && !!parent.children) {
                                return parent.children.map((child, index) => (
                                    <div className={styles.div_4} key={index} onClick={() => {
                                        props.setArticleOnEdit((prevState) => ({
                                            ...prevState,
                                            category: child,
                                            categoryId: child.id,
                                        }))
                                        setParentCategoryIdOnFocus('')
                                    }}>
                                        <div className={styles.div_5}>
                                            {child.categoryName}
                                        </div>
                                        <AiOutlinePlus className={styles.AiOutlinePlus}/>
                                    </div>
                                ))
                            }
                        })()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
