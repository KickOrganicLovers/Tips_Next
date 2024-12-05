import {useState} from "react";
import {CategoryScheme} from "@/typs";
import {useSelector} from "react-redux";
import styles from './categoryCard.module.css'

export default function CategoryCard(props : CategoryScheme){
    const [isActive, setIsActive] = useState(false)
    const className = isActive? `${styles['div1']} ${styles['active']}` : styles['div1']
    const dynamicHeight = isActive? `${props.details.length * 4}vh` : '0'

    const clickEventHandler = () => {
        setIsActive(!isActive)
    }

    const addList = (arg0: string[]) => {
        const Items = []
        for (const str of arg0) {
            Items.push(<li className={styles.li}><p className={styles.p_1}>{str}</p></li>)
        }
        return Items
    }


    return (
        <div className={styles.div0}>
            <div className={className}>
                <p onClick={clickEventHandler} className={styles.p_0}>{props.cardName}</p>
            </div>
            <ul className={styles.ul} style={{height: dynamicHeight}}>
                {addList(props.details)}
            </ul>
        </div>
    )
}