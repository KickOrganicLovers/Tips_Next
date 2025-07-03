import styles from './header.module.css'
import SearchButton from "@/app/_components/header/atoms/searchButton/searchButton";
import CategoryButton from "@/app/_components/header/atoms/categoryButton/categoryButton";
import SearchBar from "@/app/_components/header/atoms/searchBar/searchBar";
import {useRouter} from "next/navigation";
import {useState} from "react";
import classNames from "classnames";
import {MdArrowBackIos} from "react-icons/md";
import RouteProgress from "@/app/_components/header/atoms/routeProgress/routeProgress";
import SettingsButton from "@/app/_components/header/atoms/settingsButton/settingsButton";

export default function Header() {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const router = useRouter()
    const classname = isSearchMode? classNames(styles.header, styles.searchMode) : classNames(styles.header)

    const clickEventHandler_pushToRoot = () => {
        router.push("/")
    }

    const clickEventHandler_setSearchModeFalse = () => {
        setIsSearchMode(false)
    }


    return (
        <header className={classname}>
            <div className={styles.div_0} onClick={clickEventHandler_pushToRoot}>
                <img src='/images/logoTitle.png' className={styles.img_0} alt='PageIcon'/>
                <h1 className={styles.h1_0}>Tips</h1>
            </div>
            <MdArrowBackIos className={styles.MdArrowBackIos} onClick={clickEventHandler_setSearchModeFalse}/>
            <SearchBar isSearchMode={isSearchMode}/>
            <ul className={styles.ul}>
                <li className={styles.li}><SearchButton setIsSearchMode={setIsSearchMode}/></li>
                <li className={styles.li}><SettingsButton/></li>
                <li className={`${styles['li']} ${styles['li_category']}`}><CategoryButton/></li>
            </ul>
            <RouteProgress/>
        </header>
    )
}
