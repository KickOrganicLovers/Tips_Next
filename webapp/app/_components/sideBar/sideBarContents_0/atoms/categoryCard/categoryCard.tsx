import {Dispatch, SetStateAction, useState} from "react";
import styles from './categoryCard.module.css'
import {useRouter} from "next/navigation";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
import {useCategoriesStore} from "@/lib/lib-client/stores/categoriesStore";
import {CategoryScheme} from "@/types";

interface props {
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}

export default function CategoryCard(props: props) {
    const [parentCategoryOnFocus, setParentCategoryOnFocus] = useState<CategoryScheme>();
    const className = !!parentCategoryOnFocus ? `${styles['div_3']} ${styles['shifted']}` : styles['div_3']
    const categories = useCategoriesStore(state => state.categories)
    const router = useRouter()



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>カテゴリーで探す</div>
            <div className={styles.div_2}>
                <div className={className}>
                    <div className={styles.div_4}>
                        {categories.map((category, index) => (
                            <div className={styles.div_5} key={index} onClick={() => {
                                setParentCategoryOnFocus(category)
                            }}>
                                <div className={styles.div_6}>
                                    {category.categoryName}
                                </div>
                                <MdArrowForwardIos className={styles.MdArrowForwardIos}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.div_4}>
                        <div className={styles.div_8}><MdArrowBackIos className={styles.MdArrowBackIos} onClick={() => {setParentCategoryOnFocus(undefined)}}/>{parentCategoryOnFocus?.categoryName}<MdArrowBackIos className={styles.MdArrowBackIos} style={{visibility: 'hidden'}}/></div>
                        {(() => {
                            if (!!parentCategoryOnFocus && !!parentCategoryOnFocus.children) {
                                return parentCategoryOnFocus.children.map((child, index) => (
                                    <div className={styles.div_5} key={index} onClick={() => {
                                        router.push(`/categories/${child.id}`);
                                        props.setSideBarStatus({isActive: false});
                                        setParentCategoryOnFocus(undefined)
                                    }}>
                                        <div className={styles.div_6}>
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
