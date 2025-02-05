import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import sideBarStatusSlice, {toggle} from "@/redux/slices/sideBarStatusSlice";
import {AiOutlineMenu} from "react-icons/ai";
import styles from './categoryButton.module.css'

export default function CategoryButton() {
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const dispatch = useDispatch<AppDispatch>()
    const className = SideBarStatus.isActive ? `${styles['AiOutlineMenu']} ${styles['active']}` : `${styles['AiOutlineMenu']}`

    const clickEventHandler = () => {
        dispatch(toggle())
    }

    return (<AiOutlineMenu onClick={clickEventHandler} className={className}/>)

}
