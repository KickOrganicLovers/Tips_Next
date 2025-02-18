import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './sideBarContents_0.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_0/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/sideBarContents_0/atoms/categoryCard/categoryCard";
import {usePathname} from "next/navigation";
import {useEffect} from "react";

export default function SideBarContents_0() {

    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)

    useEffect(() => {
        console.log(Categories)
    }, [Categories]);

    return (
        <div className={styles.div_0}>
            <AccountBanner/>
            <div className={styles.div_1}>カテゴリーで探す</div>
            <ul className={styles.ul}>
                {Categories.map((category, i) => <li className={styles.li} key={i}><CategoryCard category={category}/></li>)}
                {/*<li className={styles.li} key={'test0'}>*/}
                {/*    <CategoryCard cardName={'test0'} details={['apple', 'orange', 'grape']}/>*/}
                {/*</li>*/}
                {/*<li className={styles.li} key={'test1'}>*/}
                {/*    <CategoryCard cardName={'test1'} details={['kajimoto', 'takamatsu', 'nishimura']}/>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
}
