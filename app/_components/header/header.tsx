import styles from './header.module.css'

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.div_0}>
                <img src='/images/PageIcon.svg' className={styles.img_0} alt='PageIcon'/>
                <img src='/images/PageTitle.svg' className={styles.img_1} alt='PageTitle'/>
            </div>
        </header>
    )
}