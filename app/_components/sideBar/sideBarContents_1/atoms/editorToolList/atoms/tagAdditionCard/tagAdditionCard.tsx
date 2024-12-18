import styles from './tagAdditionCard.module.css'
import {MdCategory} from "react-icons/md";

export default function TagAdditionCard() {
    return (
        <li className={styles.li_0}>
            <MdCategory className={styles.MdCategory}/>
            <p className={styles.p_0}>カテゴリーを追加</p>
        </li>
    )
}