import styles from './AccountBanner.module.css'
import {useUserStore} from "@/lib/lib-client/stores/userStore";


export default function AccountBanner() {
    const user = useUserStore(state => state.user)
    return (
        <div className={styles.div_0}>
            <img className={styles.img_0} src={user.image} alt={'userProfile'}/>
            <p className={styles.p_0}>{user.name}</p>
        </div>
    )
}
