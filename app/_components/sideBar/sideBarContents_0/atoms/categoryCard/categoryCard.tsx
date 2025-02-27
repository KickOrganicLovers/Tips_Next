import {ReactNode, useState} from "react";
import {CategoryScheme} from "@/typs";
import {useSelector} from "react-redux";
import styles from './categoryCard.module.css'


interface props {
    category: CategoryScheme;
}

export default function CategoryCard(props: props) {
    const [isActive, setIsActive] = useState(false)
    const className = isActive ? `${styles['div1']} ${styles['active']}` : styles['div1']
    const dynamicHeight: string = isActive && props.category.children ? `${props.category.children.length * 4}vh` : '0'

    const clickEventHandler = () => {
        setIsActive(!isActive)
    }

    const addList = (categories?: CategoryScheme[]) => {
        const Items: ReactNode[] = []
        if(categories && categories.length > 0) {
            categories.map((category, i) => {
                Items.push(<li className={styles.li} key={i}><p className={styles.p_1}>{category.category}</p></li>)
            })
            return Items
        }
    }


    return (
        <div className={styles.div0}>
            <div className={className}>
                <p onClick={clickEventHandler} className={styles.p_0}>{props.category.category}</p>
            </div>
            <ul className={styles.ul} style={{height: dynamicHeight}}>
                {addList(props.category.children)}
            </ul>
        </div>
    )
}
