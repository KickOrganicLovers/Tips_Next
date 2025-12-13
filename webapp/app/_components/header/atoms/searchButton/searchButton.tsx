import {AiOutlineSearch} from "react-icons/ai";
import styles from './searchButton.module.css'
import {Dispatch, SetStateAction} from "react";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";

interface props {
    setIsSearchMode: Dispatch<SetStateAction<boolean>>
}

export default function SearchButton(props: props) {
    const whereIam = useWhereIamStore(state => state.whereIam)
    const className = whereIam === 'search' ? `${styles.AiOutlineSearch} ${styles['active']}` : `${styles['AiOutlineSearch']}`
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)

    const clickEventHandler = () => {
        setSideBarStatus({isActive: false})
        props.setIsSearchMode(true)
    }

    return (
        <AiOutlineSearch onClick={clickEventHandler} className={className}/>
    )
}
