import styles from './header.module.css'
import HomeButton from "@/app/_components/header/atoms/homeButton/homeButton";
import SearchButton from "@/app/_components/header/atoms/searchButton/searchButton";
import CategoryButton from "@/app/_components/header/atoms/categoryButton/categoryButton";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.div_0}>
                <img src='/images/PageIcon.svg' className={styles.img_0} alt='PageIcon'/>
                <img src='/images/PageTitle.svg' className={styles.img_1} alt='PageTitle'/>
            </div>
            <ul className={styles.ul}>
                <li className={styles.li}><HomeButton/></li>
                <li className={styles.li}><SearchButton/></li>
                <li className={`${styles['li']} ${styles['li_category']}`}><CategoryButton/></li>
            </ul>
        </header>
    )
}
