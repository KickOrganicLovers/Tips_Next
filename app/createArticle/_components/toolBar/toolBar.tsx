import styles from './toolBar.module.css'
import {Dispatch, SetStateAction} from "react";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import ToolIcon from "@/app/createArticle/_components/toolBar/atoms/toolIcon/toolIcon";
import OptionButton from "@/app/createArticle/_components/toolBar/atoms/optionButton/optionButton";
import { ToolButtonStatusScheme } from '@/types';

type editorMode = 'toolBar' | 'both'

interface props {
    editorMode: editorMode
    setEditorMode: Dispatch<SetStateAction<editorMode>>
    toolButtonStatus: ToolButtonStatusScheme

}

export default function ToolBar(props: props) {
    const classname = `${styles['div_0']} ${styles[props.editorMode]}`
    const clickEventHandler = () => {
        console.log('fuck')
        switch (props.editorMode) {
            case 'both': {
                props.setEditorMode('toolBar')
                break;
            }
            case 'toolBar': {
                props.setEditorMode('both')
                break;
            }
        }
    }
    return (
        <div className={classname}>
            <div className={styles.div_1}>
                {(() => {
                    if (props.editorMode === 'toolBar') {
                        return <MdArrowBackIos onClick={clickEventHandler} className={styles.MdArrowIos}/>
                    }
                })()}
                {(() => {
                    if (props.editorMode === 'both') {
                        return <MdArrowForwardIos onClick={clickEventHandler} className={styles.MdArrowIos}/>
                    }
                })()}
            </div>
            <div className={styles.div_2}>
                <div className={styles.div_5}>
                    <OptionButton buttonOption={'setInfo'} editorMode={props.editorMode}/>
                    <OptionButton buttonOption={'upload'} editorMode={props.editorMode}/>
                    <OptionButton buttonOption={'cancel'} editorMode={props.editorMode}/>
                </div>
                <div className={styles.div_3}>
                    <h2 className={styles.h2_0}>挿入</h2>
                    <div className={styles.div_4}>
                        <ToolIcon extension={'image'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'link'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                    </div>
                </div>
                <div className={styles.div_3}>
                    <h2 className={styles.h2_0}>見出し</h2>
                    <div className={styles.div_4}>
                        <ToolIcon extension={'heading1'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'heading2'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                    </div>
                </div>
                <div className={styles.div_3}>
                    <h2 className={styles.h2_0}>テキスト装飾</h2>
                    <div className={styles.div_4}>
                        <ToolIcon extension={'italic'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'underline'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'bold'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'strikeThrough'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'codeBlock'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'highlight'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'blockQuote'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                    </div>
                </div>
                <div className={styles.div_3}>
                    <h2 className={styles.h2_0}>整列</h2>
                    <div className={styles.div_4}>
                        <ToolIcon extension={'alignLeft'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'alignRight'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'alignCenter'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                    </div>
                </div>
                <div className={styles.div_3}>
                    <h2 className={styles.h2_0}>リスト</h2>
                    <div className={styles.div_4}>
                        <ToolIcon extension={'bulletList'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                        <ToolIcon extension={'orderedList'} editorMode={props.editorMode} toolButtonStatus={props.toolButtonStatus}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
