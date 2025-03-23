import {ArticleScheme, CategoryScheme, UserProfileScheme} from "@/types";
import {useEffect, useState} from "react";
import styles from './articleContainer.module.css'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {MdCategory} from "react-icons/md";
import {useRouter} from "next/navigation";
import {IoHeart} from "react-icons/io5";
import classNames from "classnames";

interface props {
    article: ArticleScheme;
}

export default function ArticleContainer(props: props) {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? classNames(styles.div_0, styles.active) : classNames(styles.div_0)
    const router = useRouter();


    const clickEventHandler = () => {
        router.push(`/articles/${props.article.id}`)
    }




    useEffect(() => {
        setIsMounted(true)
    })
    return (
        <div className={className} onClick={clickEventHandler}>
            <div className={styles.div_1}>
                <img className={styles.img_0} alt={'articleImage'} src={props.article.thumbnailImageUrl}/>
                <div className={styles.div_5}>
                    <IoHeart className={styles.IoHeart}/>
                    <p className={styles.p_3}>{props.article.likes.length}</p>
                </div>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>{props.article.title}</p>
                <div className={styles.div_3}>
                    <div className={styles.div_4}>
                        <img className={styles.img_1} src={props.article.authorProfile.profileImageUrl} alt={'author-img'}/>
                        <p className={styles.p_1}>{props.article.authorProfile.username}</p>
                    </div>
                    <div className={styles.div_4}>
                        <MdCategory className={styles.MdCategory}/>
                        <p className={styles.p_2}>{
                            props.article.category.categoryName
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
