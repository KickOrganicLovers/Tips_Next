import styles from './articleUploadingCard.module.css'
import {MdFileUpload} from "react-icons/md";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {upload_onClick} from "@/redux/slices/articleEditorStatusSlice";

export default function ArticleUploadingCard() {

    const dispatch = useDispatch<AppDispatch>();

    const clickEventHandler = () => {
        dispatch(upload_onClick())
    }


    return (
        <li className={styles.li_0} onClick={clickEventHandler}>
            <MdFileUpload className={styles.MdFileUpload}/>
            <p className={styles.p_0}>記事を投稿</p>
        </li>
    )
}
