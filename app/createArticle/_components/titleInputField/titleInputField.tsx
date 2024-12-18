import styles from './titleInputField.module.css'
import {useState} from "react";


export default function TitleInputField() {
    const [title, setTitle] = useState('')
    return (
        <input type={"text"} className={styles.input_0} placeholder={'タイトルを入力...'} value={title} onChange={(e) => setTitle(e.target.value)}/>
    )
}