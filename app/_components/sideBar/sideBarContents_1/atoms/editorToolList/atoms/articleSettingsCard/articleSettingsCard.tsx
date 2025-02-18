import styles from './articleSettingsCard.module.css'
import {MdCategory} from "react-icons/md";
import {FaTag} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {image_onClick, settings_onClick} from "@/redux/slices/articleEditorStatusSlice";

export default function ArticleSettingsCard() {

    const dispatch = useDispatch<AppDispatch>();

    const clickEventHandler = () => {
        console.log('fuck you')
        dispatch(settings_onClick())
    }


    return (
        <li className={styles.li_0} onClick={clickEventHandler}>
            <FaTag className={styles.FaTag}/>
            <p className={styles.p_0}>記事の公開設定</p>
        </li>
    )
}
