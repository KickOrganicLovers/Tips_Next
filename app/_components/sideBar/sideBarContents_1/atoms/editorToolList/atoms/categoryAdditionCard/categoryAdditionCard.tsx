import styles from './categoryAdditionCard.module.css'
import {FaTag} from "react-icons/fa6";

export default function CategoryAdditionCard() {
    return (
        <li className={styles.li_0}>
            <FaTag className={styles.FaTag}/>
            <p className={styles.p_0}>タグを追加</p>
        </li>
    )
}