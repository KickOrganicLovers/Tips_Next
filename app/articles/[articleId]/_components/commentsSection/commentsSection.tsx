import styles from './commentsSection.module.css'
import {ArticleScheme, CommentScheme, LoginStatusScheme} from "@/types";
import CommentInsertionCard
    from "@/app/articles/[articleId]/_components/commentsSection/atoms/commentInsertionCard/commentInsertionCard";
import CommentCard from "@/app/articles/[articleId]/_components/commentsSection/atoms/commentCard/commentCard";
import {useState} from "react";

interface props{
    loginStatus: LoginStatusScheme
    article: ArticleScheme
}

export default function CommentsSection(props: props) {
    const [comments, setComments] = useState<CommentScheme[]>(props.article.comments);

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>コメント</h2>
            {(() => props.loginStatus.isLoggedIn? <CommentInsertionCard loginStatus={props.loginStatus} article={props.article} setComments={setComments}/> : null)()}
            {comments.map((comment: CommentScheme, index: number) => <CommentCard comment={comment} key={index}/>)}
        </div>
    )
}
