import styles from './titleInputField.module.css'
import {Dispatch, SetStateAction, useState} from "react";

interface props {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
}
export default function TitleInputField(props: props) {
    return (
        <input type={"text"} className={styles.input_0} placeholder={'タイトルを入力...'} value={props.title}
               onChange={(e) => props.setTitle(e.target.value)}/>
    )
}
