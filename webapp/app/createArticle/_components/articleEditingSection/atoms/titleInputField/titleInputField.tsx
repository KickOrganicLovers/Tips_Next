import styles from './titleInputField.module.css'
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {ArticleSchemeWithPrefix} from "@/types";

interface props {
    title: string
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
}
export default function TitleInputField(props: props) {

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setArticleOnEdit((prevState) => ({
            ...prevState,
            title: e.target.value
        }))
    }
    return (
        <input type={"text"} className={styles.input_0} placeholder={'タイトルを入力...'} value={props.title}
               onChange={(e) => {
                   changeEventHandler(e)
               }}/>
    )
}
