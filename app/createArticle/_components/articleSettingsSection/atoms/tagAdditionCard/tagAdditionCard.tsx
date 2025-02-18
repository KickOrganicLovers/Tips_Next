import styles from './tagAdditionCard.module.css'
import React, {Dispatch, SetStateAction, useState} from "react";
import Tag from "@/app/createArticle/_components/articleSettingsSection/atoms/tagAdditionCard/atoms/tag";

interface props {
    tags: string[]
    setTags: Dispatch<SetStateAction<string[]>>
}

export default function TagAdditionCard(props: props) {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const clickEventHandler = () => {
        if(props.tags.length < 6) {
            if(inputValue.trim() === "") return;
            props.setTags((prevTags) => [...prevTags, inputValue]);
            setInputValue("");
        }else {
            setError('タグは6つまで追加可能です。')
        }
    }



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <button className={styles.button_0} onClick={clickEventHandler}>追加</button>
                <p className={styles.p_0}>＃</p>
                <input type='text' className={styles.input_0} value={inputValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setInputValue(e.target.value)}}/>
            </div>
            <div className={styles.div_2}>
                {props.tags.map((tag, i) => (<Tag tagName={tag} id={i}　key={i} setTags={props.setTags}　setError={setError}/>))}
                <p className={styles.p_1}>{error}</p>
            </div>
        </div>
    )
}
