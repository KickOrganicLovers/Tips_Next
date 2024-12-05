import {useRouter} from "next/navigation";
import {AiOutlineHome} from "react-icons/ai";
import {useSelector} from "react-redux";
import styles from './homeButton.module.css'
import {RootState} from "@/redux/store";

export default function HomeButton() {
    const router = useRouter();
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state: RootState) => state.WhereIam)
    const className = WhereIam.whereIam === 'app' ? `${styles['AiOutlineHome']} ${styles['active']}` : `${styles['AiOutlineHome']}`


    const clickEventHandler = () => {
        router.push('/')
    }

    return (
        <AiOutlineHome onClick={clickEventHandler} className={className}/>
    )
}

