import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './sideBar.module.css'
import AccountBanner from "@/app/_components/sideBar/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/atoms/categoryCard/categoryCard";

export default function SideBar(){
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const className = SideBarStatus.isActive? `${styles[`div_0`]} ${styles['active']}` : `${styles['div_0']}`



    return (
        <div className={className}>
            <div>
                <AccountBanner/>
                <div className={styles.div_1}>カテゴリーで探す</div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <CategoryCard cardName={'test0'} details={['apple', 'orange', 'grape']}/>
                    </li>
                    <li className={styles.li}>
                        <CategoryCard cardName={'test1'} details={['kajimoto', 'takamatsu', 'nishimura']}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
