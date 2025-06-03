import styles from './toolIcon.module.css'
import {AiOutlineBold, AiOutlineEdit, AiOutlineStrikethrough} from "react-icons/ai";
import {LuAlignCenter, LuAlignLeft, LuAlignRight, LuHeading1, LuHeading2, LuItalic} from "react-icons/lu";
import {MdFormatListNumbered, MdFormatUnderlined, MdOutlineFormatListBulleted} from "react-icons/md";
import {IoCodeSlashOutline} from "react-icons/io5";
import classNames from "classnames";
import {ArticleEditorStatusScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";

type editorMode = 'toolBar' | 'both'

interface props {
    editorMode: editorMode
    extension: string
    setArticleEditorStatus: Dispatch<SetStateAction<ArticleEditorStatusScheme>>
    articleEditorStatus: ArticleEditorStatusScheme
}

export default function ToolIcon(props: props) {
    const classname = `${styles['div_0']} ${styles[props.editorMode]}`
    return (
        <div className={classname}>
            {(() => {
                switch (props.extension) {
                    case 'heading1':
                        return (<div
                            className={props.articleEditorStatus.decorations.heading_1.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        heading_1: {...prevState.decorations.heading_1, variable: !prevState.decorations.heading_1.variable}
                                    }
                                }))
                            }}><LuHeading1 className={styles.icon}/></div>)
                    case 'heading2':
                        return (<div
                            className={props.articleEditorStatus.decorations.heading_2.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        heading_2: {...prevState.decorations.heading_2, variable: !prevState.decorations.heading_2.variable}
                                    }
                                }))
                            }}><LuHeading2 className={styles.icon}/></div>)
                    case 'italic':
                        return (<div
                            className={props.articleEditorStatus.decorations.italic.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        italic: {...prevState.decorations.italic, variable: !prevState.decorations.italic.variable}
                                    }
                                }))
                            }}><LuItalic className={styles.icon}/></div>)
                    case 'underline':
                        return (<div
                            className={props.articleEditorStatus.decorations.underline.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        underline: {...prevState.decorations.underline, variable: !prevState.decorations.underline.variable}
                                    }
                                }))
                            }}><MdFormatUnderlined className={styles.icon}/></div>)
                    case 'bold':
                        return (<div
                            className={props.articleEditorStatus.decorations.bold.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        bold: {...prevState.decorations.bold, variable: !prevState.decorations.bold.variable}
                                    }
                                }))
                            }}><AiOutlineBold className={styles.icon}/></div>)
                    case 'strikeThrough':
                        return (<div
                            className={props.articleEditorStatus.decorations.strike.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        strike: {...prevState.decorations.strike, variable: !prevState.decorations.strike.variable}
                                    }
                                }))
                            }}><AiOutlineStrikethrough className={styles.icon}/></div>)
                    case 'alignLeft':
                        return (<div
                            className={props.articleEditorStatus.decorations.textAlign_left.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        textAlign_left: {
                                            ...prevState.decorations.textAlign_left,
                                            variable: !prevState.decorations.textAlign_left.variable
                                        }
                                    }
                                }))
                            }}><LuAlignLeft className={styles.icon}/></div>)
                    case 'alignRight':
                        return (<div
                            className={props.articleEditorStatus.decorations.textAlign_right.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        textAlign_right: {
                                            ...prevState.decorations.textAlign_right,
                                            variable: !prevState.decorations.textAlign_right.variable
                                        }
                                    }
                                }))
                            }}><LuAlignRight className={styles.icon}/></div>)
                    case 'alignCenter':
                        return (<div
                            className={props.articleEditorStatus.decorations.textAlign_center.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        textAlign_center: {
                                            ...prevState.decorations.textAlign_center,
                                            variable: !prevState.decorations.textAlign_center.variable
                                        }
                                    }
                                }))
                            }}><LuAlignCenter className={styles.icon}/></div>)
                    case 'orderedList':
                        return (<div
                            className={props.articleEditorStatus.decorations.orderedList.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        orderedList: {...prevState.decorations.orderedList, variable: !prevState.decorations.orderedList.variable}
                                    }
                                }))
                            }}><MdFormatListNumbered className={styles.icon}/></div>)
                    case 'bulletList':
                        return (<div
                            className={props.articleEditorStatus.decorations.bulletList.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        bulletList: {...prevState.decorations.bulletList, variable: !prevState.decorations.bulletList.variable}
                                    }
                                }))
                            }}><MdOutlineFormatListBulleted className={styles.icon}/></div>)
                    case 'codeBlock':
                        return (<div
                            className={props.articleEditorStatus.decorations.codeBlock.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        codeBlock: {...prevState.decorations.codeBlock, variable: !prevState.decorations.codeBlock.variable}
                                    }
                                }))
                            }}><IoCodeSlashOutline className={styles.icon}/></div>)
                    case 'highlight':
                        return (<div
                            className={props.articleEditorStatus.decorations.highlight.isActive ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                props.setArticleEditorStatus((prevState) => ({
                                    ...prevState,
                                    decorations: {
                                        ...prevState.decorations,
                                        highlight: {...prevState.decorations.highlight, variable: !prevState.decorations.highlight.variable}
                                    }
                                }))
                            }}><AiOutlineEdit className={styles.icon}/></div>)
                }
            })()}
            <div className={styles.div_2}>
                {(() => {
                    switch (props.extension) {
                        case 'heading1':
                            return <div className={styles.div_1}>表題1</div>
                        case 'heading2':
                            return <div className={styles.div_1}>表題2</div>
                        case 'italic':
                            return <div className={styles.div_1}>斜体</div>
                        case 'underline':
                            return <div className={styles.div_1}>下線</div>
                        case 'bold':
                            return <div className={styles.div_1}>太字</div>
                        case 'strikeThrough':
                            return <div className={styles.div_1}>横線</div>
                        case 'alignLeft':
                            return <div className={styles.div_1}>左揃え</div>
                        case 'alignRight':
                            return <div className={styles.div_1}>右揃え</div>
                        case 'alignCenter':
                            return <div className={styles.div_1}>中央揃え</div>
                        case 'orderedList':
                            return <div className={styles.div_1}>順序</div>
                        case 'bulletList':
                            return <div className={styles.div_1}>黒点</div>
                        case 'highlight':
                            return <div className={styles.div_1}>マーク</div>
                        case 'codeBlock':
                            return <div className={styles.div_1}>コード</div>
                    }
                })()}
            </div>
        </div>
    )

}
