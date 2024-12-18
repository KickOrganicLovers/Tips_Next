import styles from './imageInsertionCard.module.css'
import {FaImage} from "react-icons/fa6";

export default function ImageInsertionCard() {
    return (
        <li className={styles.li_0}>
            <FaImage className={styles.FaImage}/>
            <p className={styles.p_0}>画像を挿入</p>
        </li>
    )
}