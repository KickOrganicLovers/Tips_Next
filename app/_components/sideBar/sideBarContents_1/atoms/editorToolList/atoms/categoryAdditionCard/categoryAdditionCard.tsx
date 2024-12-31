import styles from './categoryAdditionCard.module.css'
import {FaTag} from "react-icons/fa6";
import {MdCategory} from "react-icons/md";

export default function CategoryAdditionCard() {
    return (
        <li className={styles.li_0}>
            <MdCategory className={styles.MdCategory}/>
            <p className={styles.p_0}>カテゴリーを追加</p>
        </li>
    )
}
