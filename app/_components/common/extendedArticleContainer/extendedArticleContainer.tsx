import styles from './extendedArticleContainer.module.css'
import {ArticleScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {MdCategory} from "react-icons/md";
import {useRouter} from "next/navigation";
import {LuEye} from "react-icons/lu";
import {stripTags} from "@/lib/lib-client/processing";
import {useEffect, useState} from "react";
import classNames from "classnames";

interface props {
    article: ArticleScheme
}

export default function ExtendedArticleContainer(props: props) {
    const router = useRouter()
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
                <div className={styles.div_1}>
                    <div className={styles.div_3}>
                        <img src={props.article.thumbnailImageUrl} alt='articleThumbnail' className={styles.img_0}/>
                        <div className={styles.div_7}>
                            <div className={styles.div_8}>
                                <IoHeart className={styles.IoHeart}/>
                                <p className={styles.p_3}>{props.article.likes.length}</p>
                            </div>
                            <div className={styles.div_8}>
                                <LuEye className={styles.LuEye}/>
                                <p className={styles.p_3}>{props.article.watchHistories.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.div_4}>
                        <p className={styles.p_0}>{props.article.title}</p>
                        <div className={styles.div_5}>
                            <div className={styles.div_6}>
                                <img className={styles.img_1} src={props.article.authorProfile.profileImageUrl}
                                     alt={'author-img'}/>
                                <p className={styles.p_1}>{props.article.authorProfile.username}</p>
                            </div>
                            <div className={styles.div_6}>
                                <MdCategory className={styles.MdCategory}/>
                                <p className={styles.p_2}>{
                                    props.article.category.categoryName
                                }</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.div_2}>
                    {/*<p className={styles.p_4}>{new Date(props.article.createdAt).toLocaleDateString('ja-JP', {timeZone: 'Asia/Tokyo'}) + 'に作成'}</p>*/}
                    <div className={styles.div_9}>
                        <div className={styles.div_11}>
                            {stripTags(props.article.contents)}
                        </div>
                    </div>
                    <div className={styles.div_10}>
                        <div className={styles.div_12}>
                            {props.article.tags.map((tag, index) => (
                                <div key={index} className={styles.div_13}>
                                    <p className={styles.p_5}>{'＃' + tag.tagName}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.div_14}>
                            <p className={styles.p_4}>{new Date(props.article.createdAt).toLocaleDateString('ja-JP', {timeZone: 'Asia/Tokyo'}) + 'に投稿'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
