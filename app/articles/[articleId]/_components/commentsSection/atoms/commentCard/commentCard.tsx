import styles from './commentCard.module.css'
import {CommentScheme} from "@/types";

interface props {
    comment: CommentScheme
}
export default function CommentCard(props: props) {
    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src={props.comment.userProfile?.profileImageUrl} alt={'userProfile'} className={styles.img_0}/>
                <p className={styles.p_0}>{props.comment.userProfile?.username}</p>
            </div>
            <p>
                {props.comment.contents}
            </p>
        </div>
    )

}
