import styles from './articleSettingsCard.module.css'
import {MdCategory} from "react-icons/md";
import {FaTag} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {image_onClick, settings_onClick} from "@/redux/slices/articleEditorStatusSlice";
import {AiOutlineEdit} from "react-icons/ai";

export default function ArticleSettingsCard() {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus);

    const dispatch = useDispatch<AppDispatch>();

    const clickEventHandler = () => {
        console.log('fuck you')
        dispatch(settings_onClick())
    }


    return (
        <div>
            {(() => ArticleEditorStatus.settings.variable? (
                <li className={styles.li_0} onClick={clickEventHandler}>
                    <AiOutlineEdit className={styles.AiOutlineEdit}/>
                    <p className={styles.p_0}>記事の編集</p>
                </li>
            ) : (
                <li className={styles.li_0} onClick={clickEventHandler}>
                    <FaTag className={styles.FaTag}/>
                    <p className={styles.p_0}>記事の公開設定</p>
                </li>
            ))()}
        </div>
    )
}
