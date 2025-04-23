import {ReactNode, useState} from "react";
import {CategoryScheme} from "@/types";
import {useSelector} from "react-redux";
import styles from './categoryCard.module.css'
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";

export default function CategoryCard() {
    const [isActive, setIsActive] = useState(false)
    const className = isActive ? `${styles['div_3']} ${styles['active']}` : styles['div_3']
    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)
    const router = useRouter()




    //<li className={styles.li} key={i}><p className={styles.p_1}>{category.categoryName}</p></li>

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>カテゴリーで探す</div>
            {Categories.map((category, index) => (
                <div className={styles.div_2} key={index}>
                    <div className={className} onClick={() => {setIsActive(!isActive)}}>
                        {category.categoryName}
                    </div>
                    <ul className={styles.ul_0} style={{height: isActive && category.children ? `${category.children.length * 36}px` : '0'}}>
                        {category.children?.map((children, i) => (
                            <li className={styles.li_0} key={i} onClick={() => {router.push(`/categories/${children.id}`)}}>{children.categoryName}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
