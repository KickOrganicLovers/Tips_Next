import {ArticleScheme, CategoryScheme, UserScheme} from "@/types";
import {useEffect, useRef, useState} from "react";
import styles from './articleContainer.module.css'
import {MdCategory} from "react-icons/md";
import {useRouter} from "next/navigation";
import {IoHeart} from "react-icons/io5";
import classNames from "classnames";
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";

interface props {
    article?: ArticleScheme;
    isDummy?: boolean;
    isFirstDummy?: boolean;
    firstDummy_onVisible?: () => Promise<void>
}

export default function ArticleContainer(props: props) {
    const router = useRouter();
    const ref = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);


    const clickEventHandler = () => {
        if(!!props.article && !props.isDummy) {
            router.push(`/articles/${props.article.id}`)
        }
    }

    useEffect(() => {
        const target = ref?.current;
        if (!target || !props.isFirstDummy) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetching) {
                    setIsFetching(true);

                    if(!!props.firstDummy_onVisible){
                        props.firstDummy_onVisible().then(() => {
                            setIsFetching(false)
                        })
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(target);

        return () => {
            observer.disconnect(); // クリーンアップ
        };
    }, []);


    return (
        <div className={styles.div_0} onClick={clickEventHandler}>
            {!props.isDummy && !!props.article ? (
                <div className={styles.div_1}>
                    <img className={styles.img_0} alt={'articleImage'} src={props.article.thumbnailImageUrl}/>
                    <div className={styles.div_5}>
                        <IoHeart className={styles.IoHeart}/>
                        <p className={styles.p_3}>{props.article.likes.length}</p>
                    </div>
                </div>
            ):
                (
                <div className={styles.div_1} style={{backgroundColor: 'var(--bg-color-2)'}} ref={ref}>
                </div>
            )
            }
            {!props.isDummy && !!props.article? (
                <div className={styles.div_2}>
                    <p className={styles.p_0}>{props.article.title}</p>
                    <div className={styles.div_3}>
                        <div className={styles.div_4}>
                            <img className={styles.img_1} src={props.article.author.image} alt={'author-img'}/>
                            <p className={styles.p_1}>{props.article.author.name}</p>
                        </div>
                        <div className={styles.div_4}>
                            <MdCategory className={styles.MdCategory}/>
                            <p className={styles.p_2}>{
                                props.article.category.categoryName
                            }</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.div_6}>
                    <div className={styles.shimmerBar}></div>
                    <div className={styles.shimmerBar} style={{width: '75%'}}></div>
                </div>
            )}
        </div>
    )
}
