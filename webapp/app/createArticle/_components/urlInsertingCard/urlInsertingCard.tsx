import styles from './urlInsertingCard.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {IoIosLink} from "react-icons/io";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {Editor} from "@tiptap/core";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import { ToolButtonStatusScheme } from '@/types';

interface props {
    setToolButtonStatus: Dispatch<SetStateAction<ToolButtonStatusScheme>>;
    editor: Editor
}

export const UrlInsertingCard = (props: props) => {
    const appendError = useErrorStore(state => state.appendError)
    const [targetUrl, setTargetUrl] = useState<string>('')

    const clickEventHandler_close = () => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            controls: {
                ...prevState.controls,
                link: false
            }
        }))
    }

    const clickEventHandler_insert = () => {
        getDataFromServerWithJson<{metadata: {url: string, title: string, description: string, thumbnailImageUrl: string}}>(`/api/getMetaData?targetUrl=${encodeURIComponent(targetUrl)}`).then((json) => {
            if(!!json){
                props.editor?.commands.insertOgpCard(json.metadata)
                props.setToolButtonStatus((prevState) => ({
                    ...prevState,
                    controls: {
                        ...prevState.controls,
                        link: false
                    }
                }))
            }
        }).catch(error => {
            appendError(error)
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
