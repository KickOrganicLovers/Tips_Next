import styles from './searchBar.module.css'
import {AiOutlineSearch} from "react-icons/ai";
import {useCallback, useState, KeyboardEvent} from "react";
import {useRouter} from "next/navigation";
import classNames from "classnames";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const className = searchQuery === ''? classNames(styles.AiOutlineSearch) : classNames(styles.AiOutlineSearch, styles.active)

    const clickEventHandler = () => {
        if(searchQuery !== '') {
            const params = new URLSearchParams({search_query: searchQuery});
            router.push(`/search?${params.toString()}`);
        }
    }

    const keyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            clickEventHandler()
        }
    }


    return (
        <div className={styles.div_0}>
            <input type={"text"} className={styles.input_0} placeholder={'記事を検索'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={keyDownEventHandler}/>
            <AiOutlineSearch className={className} onClick={clickEventHandler}/>
        </div>
    )
}
