import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import styles from './editorToolButton.module.css'
import {
    bold_onClick, bulletList_onClick, codeBlock_onClick,
    heading_1_onClick,
    heading_2_onClick,
    highlight_onClick,
    italic_onClick, orderedList_onClick,
    strike_onClick, textAlign_center_onClick, textAlign_left_onClick, textAlign_right_onClick,
    underline_onClick
} from "@/redux/slices/articleEditorStatusSlice";
import Image from "next/image";
import {useCallback} from "react";

interface props {
    extension: string;
    index: number;
}

export default function EditorToolButton(props: props) {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const extensionStatus = ArticleEditorStatus[props.extension as keyof typeof ArticleEditorStatus]
    const className = extensionStatus.isActive? `${styles['button']} ${styles['active']}` : `${styles['button']}`
    const imageSrc = `/images/toolBoxIcons/${props.extension}.svg`

    const dispatch = useDispatch<AppDispatch>();

    const style = {
        top: `${8.5 - 7 * Math.sin(2 / 13 * props.index * Math.PI)}vw`,
        left: `${8.5 + 7 * Math.cos(2 / 13 * props.index * Math.PI )}vw`,
    }


    const clickEventHandler = () => {
        switch (props.extension) {
            case 'bold': {
                dispatch(bold_onClick())
                break;
            }
            case 'underline': {
                dispatch(underline_onClick())
                break
            }
            case 'italic': {
                dispatch(italic_onClick())
                break
            }
            case 'strike': {
                dispatch(strike_onClick())
                break
            }
            case 'heading_1': {
                dispatch(heading_1_onClick())
                break
            }
            case 'heading_2': {
                dispatch(heading_2_onClick())
                break
            }
            case 'highlight': {
                dispatch(highlight_onClick())
                break
            }
            case 'codeBlock': {
                dispatch(codeBlock_onClick())
                break
            }
            case 'bulletList': {
                dispatch(bulletList_onClick())
                break
            }
            case 'orderedList': {
                dispatch(orderedList_onClick())
                break
            }
            case 'textAlign_left': {
                dispatch(textAlign_left_onClick())
                break
            }
            case 'textAlign_center': {
                dispatch(textAlign_center_onClick())
                break
            }
            case 'textAlign_right': {
                dispatch(textAlign_right_onClick())
                break
            }
        }
    }

    return (
        <Image src= {imageSrc} alt= {props.extension} onClick={clickEventHandler} className={className} width={0} height={0} style={style}/>
    )
}