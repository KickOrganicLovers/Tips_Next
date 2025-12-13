import {ErrorScheme} from "@/types";
import styles from './errorCard.module.css'

import {FiAlertCircle} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface props{
    error: ErrorScheme
    index: number
}

export default function ErrorCard(props: props) {
    const removeError = useErrorStore(state => state.removeError)

    const clickEventHandler = (): void => {
        removeError(props.index)
    }


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <FiAlertCircle className={styles.FiAlertCircle}/>
                <p className={styles.p_0}>{props.error.message}</p>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_1}>{props.error.code}</p>
            </div>
            <AiOutlineClose className={styles.AiOutlineClose} onClick={clickEventHandler}/>
        </div>
    )
}

