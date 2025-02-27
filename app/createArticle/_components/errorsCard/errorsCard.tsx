import styles from './errorsCard.module.css'
import {Dispatch, SetStateAction} from "react";
import {AiOutlineClose} from "react-icons/ai";

interface props {
    errors: string[];
    setErrors: Dispatch<SetStateAction<string[]>>;
}

export default function ErrorsCard(props: props) {

    const clickEventHandler = () => {
        props.setErrors([])
    }

    return (
        <div className={styles.div_0}>
            <h2>以下の点の不足により、記事の投稿を完了できませんでした</h2>
            <AiOutlineClose className={styles.AiOutlineClose} onClick={clickEventHandler}/>
            <ul className={styles.ul_0}>
                {props.errors.map((error, index) => <li className={styles.li_0} key={index}>{error}</li>)}
            </ul>
        </div>
    )

}
