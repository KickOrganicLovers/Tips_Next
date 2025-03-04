import styles from './totalLikesCard.module.css'
import {IoHeart} from "react-icons/io5";
import {LikeScheme} from "@/types";

interface props {
    likes: LikeScheme[]
}

export default function TotalLikesCard(props: props) {
    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <IoHeart className={styles.IoHeart}/>
                <p className={styles.p_0}>{props.likes.length}</p>
            </div>
        </div>
    )
}
