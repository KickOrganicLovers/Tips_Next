import styles from "@/app/articles/[articleId]/_components/totalLikesCard/totalLikesCard.module.css";
import {IoHeart} from "react-icons/io5";
import {WatchHistoryScheme} from "@/types";
import {LuEye} from "react-icons/lu";

interface props {
    views: WatchHistoryScheme[]
}
export default function TotalViewsCard(props: props) {
    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <LuEye className={styles.LuEye}/>
                <p className={styles.p_0}>{props.views.length}</p>
            </div>
        </div>
    )
}
