import styles from './reducedArticleContainer.module.css'
import {ArticleScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {LuEye} from "react-icons/lu";
import {MdCategory} from "react-icons/md";
import {stripTags} from "@/lib/lib-client/processing";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import classNames from "classnames";

interface props {
    article: ArticleScheme;
}

export default function ReducedArticleContainer(props: props) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? classNames(styles.div_0, styles.active) : classNames(styles.div_0)

    const clickEventHandler = () => {
        router.push(`/articles/${props.article.id}`)
    }

    useEffect(() => {
        setIsMounted(true)
    })

    return (
        <div className={styles.virtual_wrapper}>
            <div className={className} onClick={clickEventHandler}>
                <img src={props.article.thumbnailImageUrl} alt='thumbnail' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <p className={styles.p_0}>{props.article.title}</p>
                    <div className={styles.div_3}>
                        <img src={props.article.author.image} alt='profile' className={styles.img_1}/>
                        <p className={styles.p_1}>{props.article.author.name}</p>
                    </div>
                    <div className={styles.div_4}>
                        <div className={styles.div_5}><IoHeart/>{props.article.likes?.length}</div>
                        <div className={styles.div_5}><LuEye/>{props.article.watchHistories?.length}</div>
                        <div className={styles.div_5}><MdCategory/>{props.article.category?.categoryName}</div>
                    </div>
                    <div className={styles.div_6}>
                        {stripTags(props.article.contents)}
                    </div>
                </div>
            </div>
        </div>
    )
}
