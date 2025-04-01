import {AiOutlineClose} from "react-icons/ai";
import styles from './tag.module.css'
import {Dispatch, SetStateAction, useEffect} from "react";

interface props {
    tagName: string
    setTags: Dispatch<SetStateAction<string[]>>
    setError: Dispatch<SetStateAction<string>>
    id: number
}

export default function Tag(props: props) {

    const clickEventHandler = () => {
        props.setTags((prevState) => prevState.filter((_, index) => index !== props.id));
        props.setError('');
    }


    useEffect(() => {
    })

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>＃</p>
            <p className={styles.p_1}>
                {props.tagName}
            </p>
            <AiOutlineClose className={styles.AiOutlineClose} onClick={clickEventHandler}/>
        </div>
    )
}
