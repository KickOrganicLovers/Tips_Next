import {ArticleScheme} from "@/typs";
import {useEffect, useState} from "react";
import styles from './articleContainer.module.css'

export default function ArticleContainer(props: ArticleScheme) {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['active']}` : styles['div_0'];

    useEffect(() => {
        setIsMounted(true)
    })
    return (
        <div className={className}>
            <div className={styles.div_1}><img/></div>
            <div className={styles.div_2}>{props.title}</div>
        </div>
    )
}