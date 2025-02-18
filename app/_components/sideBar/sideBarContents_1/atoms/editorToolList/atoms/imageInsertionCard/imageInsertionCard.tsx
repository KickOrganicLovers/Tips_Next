import styles from './imageInsertionCard.module.css'
import {FaImage} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {image_onClick} from "@/redux/slices/articleEditorStatusSlice";

export default function ImageInsertionCard() {
    const dispatch = useDispatch<AppDispatch>();

    const clickEventHandler = () => {
        dispatch(image_onClick())
    }
    return (
        <li className={styles.li_0} onClick={clickEventHandler}>
            <FaImage className={styles.FaImage}/>
            <p className={styles.p_0}>画像を挿入</p>
        </li>
    )
}
