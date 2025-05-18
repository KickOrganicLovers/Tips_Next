import {Dispatch, SetStateAction, useState} from "react";
import styles from './categoryCard.module.css'
import {useRouter} from "next/navigation";
import useCategoriesStore from "@/lib/lib-client/stores/categoriesStore";

interface props {
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}

export default function CategoryCard(props: props) {
    const [isActive, setIsActive] = useState(false)
    const className = isActive ? `${styles['div_3']} ${styles['active']}` : styles['div_3']
    const categories = useCategoriesStore(state => state.categories)
    const router = useRouter()




    //<li className={styles.li} key={i}><p className={styles.p_1}>{category.categoryName}</p></li>

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>カテゴリーで探す</div>
            {categories.map((category, index) => (
                <div className={styles.div_2} key={index}>
                    <div className={className} onClick={() => {setIsActive(!isActive)}}>
                        {category.categoryName}
                    </div>
                    <ul className={styles.ul_0} style={{height: isActive && category.children ? `${category.children.length * 36}px` : '0'}}>
                        {category.children?.map((children, i) => (
                            <li className={styles.li_0} key={i} onClick={() => {
                                router.push(`/categories/${children.id}`);
                                props.setSideBarStatus({isActive: false})
                            }}>{children.categoryName}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
