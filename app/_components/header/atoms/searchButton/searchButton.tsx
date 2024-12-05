import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import styles from './searchButton.module.css'
import {RootState} from "@/redux/store";

export default function SearchButton(){
    const router = useRouter()
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state: RootState) => state.WhereIam)
    const className =  WhereIam.whereIam === 'search'? `${styles.AiOutlineSearch} ${styles['active']}` : `${styles['AiOutlineSearch']}`

    const clickEventHandler = () => {
        router.push('/search')
    }

    return  (
        <AiOutlineSearch  onClick={clickEventHandler} className={className}/>
    )
}