import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import styles from './searchButton.module.css'
import {RootState} from "@/redux/store";
import {Dispatch, SetStateAction} from "react";
import {disable} from "@/redux/slices/sideBarStatusSlice";

interface props {
    setIsSearchMode: Dispatch<SetStateAction<boolean>>
}

export default function SearchButton(props: props) {
    const router = useRouter()
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state: RootState) => state.WhereIam)
    const className = WhereIam.whereIam === 'search' ? `${styles.AiOutlineSearch} ${styles['active']}` : `${styles['AiOutlineSearch']}`
    const dispatch = useDispatch();

    const clickEventHandler = () => {
        dispatch(disable())
        props.setIsSearchMode(true)
    }

    return (
        <AiOutlineSearch onClick={clickEventHandler} className={className}/>
    )
}
