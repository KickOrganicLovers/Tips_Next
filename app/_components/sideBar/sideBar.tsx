import styles from './sideBar.module.css'
import SideBarContents_0 from "@/app/_components/sideBar/sideBarContents_0/sideBarContents_0";
import SideBarContents_1 from "@/app/_components/sideBar/sideBarContents_1/sideBarContents_1";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";

export default function sideBar() {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const whereIam = useWhereIamStore(state => state.whereIam)
    const className_div0 = sideBarStatus.isActive ? `${styles[`div_0`]} ${styles['active']}` : `${styles['div_0']}`
    const className_div1 = `${styles[`div_1`]} ${styles[whereIam]}`

    return (
        <div className={className_div0}>
            <div className={className_div1}>
                <SideBarContents_1/>
                <SideBarContents_0/>
            </div>
        </div>
    )
}
