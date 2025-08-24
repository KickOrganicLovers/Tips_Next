import styles from './reducedArticleContainer.module.css'
import {ArticleScheme} from "@/types";
import {IoHeart} from "react-icons/io5";
import {LuEye} from "react-icons/lu";
import {MdCategory} from "react-icons/md";
import {stripTags} from "@/lib/lib-client/processing";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";

interface props {
    article?: ArticleScheme;
    isDummy?: boolean;
    isFirstDummy?: boolean;
    firstDummy_onVisible?: () => Promise<void>
}

export default function ReducedArticleContainer(props: props) {
    const router = useRouter();
    const isFetchingRef = useRef(false);
    const ref = useRef<HTMLDivElement | null>(null);

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
                if (entry.isIntersecting && !isFetchingRef.current) {
                    isFetchingRef.current = true;

                    props.firstDummy_onVisible?.().finally(() => {
                        isFetchingRef.current = false;
                    });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [props.isFirstDummy, props.firstDummy_onVisible]);

    return (
            <div className={styles.div_0} onClick={clickEventHandler}>
                {!props.isDummy && !!props.article ? (
                        <div className={styles.div_1}>
                            <img src={props.article.thumbnailImageUrl} alt='thumbnail' className={styles.img_0}/>
                        </div>
                    ):
                    (
                        <div className={styles.div_1} ref={ref}>
                        </div>
                    )
                }
                {!props.isDummy && !!props.article ? (
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
                    ):
                    (
                        <div className={styles.div_7}>
                            <div className={styles.shimmerBar} style={{width: '100%'}}></div>
                            <div className={styles.shimmerBar} style={{width: '75%'}}></div>
                            <div className={styles.shimmerBar} style={{width: '100%'}}></div>
                            <div className={styles.shimmerBar} style={{width: '100%'}}></div>
                        </div>

                    )
                }
            </div>
    )
}
