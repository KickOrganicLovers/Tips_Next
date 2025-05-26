import styles from './myOptionsCard.module.css'

import {AiOutlineFire} from "react-icons/ai";
import {IoHeartOutline} from "react-icons/io5";
import {MdHistory, MdOutlineRecommend} from "react-icons/md";
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {Dispatch, SetStateAction} from "react";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";

interface props {
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>;
}

export default function MyOptionsCard(props: props) {
    const whereIam = useWhereIamStore(state => state.whereIam)
    const router = useRouter();


    const onClick_pushToRecommendation = () => {
        router.push('/')
        props.setSideBarStatus({isActive: false})
    }

    const onClick_pushToTrending = () => {
        router.push('/trending')
        props.setSideBarStatus({isActive: false})
    }

    const onClick_pushToLikes = () => {
        router.push('/likes')
        props.setSideBarStatus({isActive: false})
    }

    const onClick_pushToHistory = () => {
        router.push('/watchHistory')
        props.setSideBarStatus({isActive: false})
    }

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>表示する記事</div>
            <ul className={styles.ul_0}>
                <li className={(() => whereIam === 'root' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()}
                    onClick={onClick_pushToRecommendation}>
                    <MdOutlineRecommend className={styles.icons}/>
                    <p className={styles.p_0}>おすすめ記事</p>
                </li>
                <li className={(() => whereIam === 'trending' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()}
                    onClick={onClick_pushToTrending}>
                    <AiOutlineFire className={styles.icons}/>
                    <p className={styles.p_0}>トレンド記事</p>
                </li>
                <li className={(() => whereIam === 'likes' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()}
                    onClick={onClick_pushToLikes}>
                    <IoHeartOutline className={styles.icons}/>
                    <p className={styles.p_0}>いいねした記事</p>
                </li>
                <li className={(() => whereIam === 'watchHistory' ? classNames(styles.li_0, styles.active) : classNames(styles.li_0))()}
                    onClick={onClick_pushToHistory}>
                    <MdHistory className={styles.icons}/>
                    <p className={styles.p_0}>閲覧履歴</p>
                </li>
            </ul>
        </div>

    )
}
