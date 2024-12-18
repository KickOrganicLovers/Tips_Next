import styles from './sideBar.module.css'
import SideBarContents_0 from "@/app/_components/sideBar/sideBarContents_0/sideBarContents_0";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {usePathname} from "next/navigation";
import SideBarContents_1 from "@/app/_components/sideBar/sideBarContents_1/sideBarContents_1";

export default function SideBar(){
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const className = SideBarStatus.isActive? `${styles[`div_0`]} ${styles['active']}` : `${styles['div_0']}`
    const pathName = usePathname()

    return (
        <div className={className}>
            {(() => {
                if(pathName === '/createArticle'){
                    return <SideBarContents_1/>
                }else {
                    return <SideBarContents_0/>
                }
            })()}
        </div>
    )
}