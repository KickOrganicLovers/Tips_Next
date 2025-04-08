import styles from './header.module.css'
import HomeButton from "@/app/_components/header/atoms/homeButton/homeButton";
import SearchButton from "@/app/_components/header/atoms/searchButton/searchButton";
import CategoryButton from "@/app/_components/header/atoms/categoryButton/categoryButton";
import SearchBar from "@/app/_components/header/atoms/searchBar/searchBar";
import {useRouter} from "next/navigation";
import {useCallback} from "react";

export default function Header() {
    const router = useRouter()

    const clickEventHandler = () => {
        router.push("/")
    }



    return (
        <header className={styles.header}>
            <div className={styles.div_0} onClick={clickEventHandler}>
                <img src='/images/logoTitle.png' className={styles.img_0} alt='PageIcon'/>
                <h1 className={styles.h1_0}>Tips</h1>
                {/*<img src='/images/PageTitle.svg' className={styles.img_1} alt='PageTitle'/>*/}
            </div>
            <SearchBar/>
            <ul className={styles.ul}>
                {/*<li className={styles.li}><SearchButton/></li>*/}
                <li className={`${styles['li']} ${styles['li_category']}`}><CategoryButton/></li>
            </ul>
        </header>
    )
}
