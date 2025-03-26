import styles from './myOptionsCard.module.css'

import {AiOutlineFire} from "react-icons/ai";
import {IoHeartOutline} from "react-icons/io5";
import {MdHistory, MdOutlineRecommend} from "react-icons/md";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import classNames from "classnames";

export default function MyOptionsCard() {
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state) => state.WhereIam)
    const router = useRouter();


    const onClick_pushToRecommendation = () => {
        router.push('/')
    }

    const onClick_pushToTrending = () => {
        router.push('/trending')
    }

    const onClick_pushToLikes = () => {
        router.push('/likes')
    }

    const onClick_pushToHistory = () => {
        router.push('/watchHistory')
    }

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>表示する記事</div>
            <ul className={styles.ul_0}>
                <li className={(() => WhereIam.whereIam === 'app' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()} onClick={onClick_pushToRecommendation}>
                    <MdOutlineRecommend className={styles.icons}/>
                    <p className={styles.p_0}>おすすめ記事</p>
                </li>
                <li className={(() => WhereIam.whereIam === 'trending' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()} onClick={onClick_pushToTrending}>
                    <AiOutlineFire className={styles.icons}/>
                    <p className={styles.p_0}>トレンド記事</p>
                </li>
                <li className={(() => WhereIam.whereIam === 'likes' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()} onClick={onClick_pushToLikes}>
                    <IoHeartOutline className={styles.icons}/>
                    <p className={styles.p_0}>いいねした記事</p>
                </li>
                <li className={(() => WhereIam.whereIam === 'watchHistory' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()} onClick={onClick_pushToHistory}>
                    <MdHistory className={styles.icons}/>
                    <p className={styles.p_0}>閲覧履歴</p>
                </li>
            </ul>
        </div>

    )
}
