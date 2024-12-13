import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import styles from "@/app/createArticle/_components/editingToolBar/atoms/buttonBold/buttonBold.module.css";
import {bold_onClick} from "@/redux/slices/articleEditorStatusSlice";

export default function ButtonBold() {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const isBoldActive = ArticleEditorStatus.bold.isActive
    const className = isBoldActive? `${styles['button']} ${styles['active']}` : `${styles['button']}`

    const dispatch = useDispatch<AppDispatch>();

    const clickEventHandler = () => {
        dispatch(bold_onClick())
    }

    return (
        <button onClick={clickEventHandler} className={className}>B</button>
    )
}