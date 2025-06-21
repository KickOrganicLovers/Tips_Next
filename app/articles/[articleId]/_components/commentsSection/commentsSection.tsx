import styles from './commentsSection.module.css'
import {ArticleScheme, CommentScheme, UserScheme} from "@/types";
import CommentInsertionCard
    from "@/app/articles/[articleId]/_components/commentsSection/atoms/commentInsertionCard/commentInsertionCard";
import CommentCard from "@/app/articles/[articleId]/_components/commentsSection/atoms/commentCard/commentCard";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {IoChevronDown} from "react-icons/io5";
import classNames from "classnames";
import {useSession} from "next-auth/react";

interface props{
    article: ArticleScheme
    setArticle: Dispatch<SetStateAction<ArticleScheme>>
}

export default function CommentsSection(props: props) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [virtualHeight, setVirtualHeight] = useState<number>(0)
    const className_div_2 = isOpen? classNames(styles.div_2, styles.active) : classNames(styles.div_2)
    const virtualNodeRef = useRef<HTMLDivElement | null>(null)
    const accordionRef = useRef<HTMLDivElement>(null)
    const session = useSession()

    const handleToggle = () => {
        if (isOpen && accordionRef.current) {
            accordionRef.current?.scrollTo(0,0)
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const updateVirtualHeight = () => {
        if (virtualNodeRef.current) {
            setVirtualHeight(virtualNodeRef.current.offsetHeight)
        }
    }

    useEffect(() => {
        // 初期高さ設定
        updateVirtualHeight()

        // リサイズ時の処理
        const handleResize = () => {
            updateVirtualHeight()
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [props.article.comments.length]) // コメント数が変わったときにも高さを更新


    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>コメント</h2>
            <div className={styles.div_4}>
                {(() => session.status === 'authenticated'? <CommentInsertionCard article={props.article} setArticle={props.setArticle}/> : null)()}
                <div className={styles.div_1}>
                    <h3 className={styles.h3_0}>{props.article.comments.length}件のコメント</h3>
                    <IoChevronDown className={styles.IoChevronDown} onClick={handleToggle} style={isOpen && props.article.comments.length > 1 ? {transform: 'rotate(180deg)'} : undefined}/>
                </div>
                {props.article.comments.length > 0? <div>
                    <div className={className_div_2} style={{maxHeight: (isOpen? '500px': virtualHeight + 'px')}} ref={accordionRef}>
                        {props.article.comments.map((comment: CommentScheme, index: number) => <CommentCard comment={comment} key={index} setArticle={props.setArticle}/>)}
                    </div>

                    {/*virtual node*/}
                    <div style={{visibility: 'hidden', position: 'absolute', zIndex: '-1'}} ref={virtualNodeRef}>
                        <CommentCard comment={props.article.comments[0]} setArticle={props.setArticle}/>
                    </div>
                </div>: null}
                {(() => props.article.comments.length === 0? <div className={styles.div_3}>この記事にまだコメントはありません。</div> : null)()}
            </div>
        </div>
    )
}
