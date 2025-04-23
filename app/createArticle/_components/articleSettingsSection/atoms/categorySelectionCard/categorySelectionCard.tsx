import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './categorySelectionCard.module.css'
import {CategoryScheme} from "@/types";
import {findCategoryById} from "@/lib-client/processing";

interface props{
    category: CategoryScheme,
    setCategory: Dispatch<SetStateAction<CategoryScheme>>
}
export default function CategorySelectionCard(props: props) {
    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)
    const [parentCategoryIdOnFocus, setParentCategoryIdOnFocus] = useState<number>(0);
    const [categoryName, setCategoryName] = useState<string>('');
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const className_ul_1 = isClicked ? `${styles['ul_1']} ${styles['active']}` : `${styles['ul_1']}`


    const clickEventHandler = (index: number) => {
        setIsClicked(true)
        setParentCategoryIdOnFocus(index)
    }

    useEffect(() => {
        setCategoryName(props.category?.categoryName)
    }, [props]);

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_0}>選択したカテゴリー：<mark className={styles.mark_0}>{categoryName}</mark></p>
            </div>
            <div className={styles.div_2}>
                <ul className={styles.ul_0}>
                    {Categories.map((category, i) => <li
                        className={(() => i === parentCategoryIdOnFocus && isClicked ? `${styles['li_0']} ${styles['active']}` : `${styles['li_0']}`)()}
                        key={i} onClick={() => {
                        clickEventHandler(i)
                    }}>{category.categoryName}</li>)}
                </ul>
                <ul className={className_ul_1}>
                    {(() => {
                        if (Categories && Categories.length > 0 && isClicked) {
                            if (Categories[parentCategoryIdOnFocus].children) {
                                return Categories[parentCategoryIdOnFocus].children.map((child: CategoryScheme, i: number) => <li key={i}
                                                                                                          className={styles.li_1}
                                                                                                          onClick={() => {
                                                                                                              props.setCategory(child);
                                                                                                              setCategoryName(child.categoryName)
                                                                                                          }}>{child.categoryName}</li>)
                            }
                        }
                    })()}
                </ul>
            </div>
        </div>
    )
}
