import styles from './urlInsertingCard.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {IoIosLink} from "react-icons/io";
import {ArticleEditorStatusScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {Editor} from "@tiptap/core";

interface props {
    setArticleEditorStatus: Dispatch<SetStateAction<ArticleEditorStatusScheme>>;
    editor: Editor
}

export const UrlInsertingCard = (props: props) => {
    const [targetUrl, setTargetUrl] = useState<string>('')

    const clickEventHandler_close = () => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            controls: {
                ...prevState.controls,
                link: {
                    ...prevState.controls.link,
                    isActive: false,
                }
            }
        }))
    }

    const clickEventHandler_insert = () => {
        getDataFromServerWithJson<{metadata: {url: string, title: string, description: string, thumbnailImageUrl: string}, error: string}>(`/api/getMetaData?targetUrl=${targetUrl}}`).then((json) => {
            console.log(json.metadata);
            if(!!json.metadata && !json.error){
                props.editor?.commands.insertOgpCard(json.metadata)
                props.setArticleEditorStatus((prevState) => ({
                    ...prevState,
                    controls: {
                        ...prevState.controls,
                        link: {
                            ...prevState.controls.link,
                            isActive: false,
                        }
                    }
                }))
            }
        })
    }

    return (
        <div className={styles.div_0}>
            <h1 className={styles.h1_0}>挿入するリンクを入力</h1>
            <div className={styles.div_1}>
                <input className={styles.input_0} onChange={(e) => {setTargetUrl(e.target.value)}}/>
                <button className={styles.button_0} onClick={clickEventHandler_insert}>挿入</button>
            </div>
            <AiOutlineClose className={styles.AiOutlineClose} onClick={clickEventHandler_close}/>
        </div>
    )
}
