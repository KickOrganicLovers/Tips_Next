import styles from './sideBar.module.css'
import SideBarContents_0 from "@/app/_components/sideBar/sideBarContents_0/sideBarContents_0";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {usePathname} from "next/navigation";
import SideBarContents_1 from "@/app/_components/sideBar/sideBarContents_1/sideBarContents_1";
import {useEffect} from "react";

export default function SideBar() {
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state) => state.WhereIam)
    const className_div0 = SideBarStatus.isActive ? `${styles[`div_0`]} ${styles['active']}` : `${styles['div_0']}`
    const className_div1 = `${styles[`div_1`]} ${styles[WhereIam.whereIam]}`

    useEffect(() => {
        console.log(WhereIam.whereIam)
    }, []);

    return (
        <div className={className_div0}>
            <div className={className_div1}>
                <SideBarContents_1/>
                <SideBarContents_0/>
            </div>
        </div>
    )
}
