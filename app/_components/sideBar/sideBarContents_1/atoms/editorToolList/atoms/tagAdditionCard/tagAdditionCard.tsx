import styles from './tagAdditionCard.module.css'
import {MdCategory} from "react-icons/md";
import {FaTag} from "react-icons/fa6";

export default function TagAdditionCard() {
    return (
        <li className={styles.li_0}>
            <FaTag className={styles.FaTag}/>
            <p className={styles.p_0}>タグを追加</p>
        </li>
    )
}
