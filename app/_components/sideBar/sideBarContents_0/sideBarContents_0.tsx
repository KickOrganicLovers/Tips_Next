import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './sideBarContents_0.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_0/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/sideBarContents_0/atoms/categoryCard/categoryCard";
import {usePathname} from "next/navigation";

export default function SideBarContents_0(){



    return (
        <div>
            <AccountBanner/>
            <div className={styles.div_0}>カテゴリーで探す</div>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <CategoryCard cardName={'test0'} details={['apple', 'orange', 'grape']}/>
                </li>
                <li className={styles.li}>
                    <CategoryCard cardName={'test1'} details={['kajimoto', 'takamatsu', 'nishimura']}/>
                </li>
            </ul>
        </div>
    )
}
