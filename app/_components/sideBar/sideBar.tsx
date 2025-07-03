import styles from './sideBar.module.css'
import SideBarContents_0 from "@/app/_components/sideBar/sideBarContents_0/sideBarContents_0";
import SideBarContents_1 from "@/app/_components/sideBar/sideBarContents_1/sideBarContents_1";
import {settingsAtom, sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import SideBarContents_2 from "@/app/_components/sideBar/sideBarContents_2/sideBarContents_2";

export default function sideBar() {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const [settings, setSettings] = useAtom(settingsAtom)
    const whereIam = useWhereIamStore(state => state.whereIam)
    const className_div0 = sideBarStatus.isActive? `${styles[`div_0`]} ${styles['active']}` : `${styles['div_0']}`
    const className_div1 = (() => {
        if(settings.isActive) {
            return `${styles[`div_1`]} ${styles['settings']}`
        }else if(whereIam === 'createArticle') {
            return `${styles[`div_1`]} ${styles['createArticle']}`
        }else {
            return `${styles[`div_1`]}`
        }
    })()

    return (
        <div className={className_div0}>
            <div className={className_div1}>
                <SideBarContents_2/>
                <SideBarContents_0/>
                <SideBarContents_1/>
            </div>
        </div>
    )
}
