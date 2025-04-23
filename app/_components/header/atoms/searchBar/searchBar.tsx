import styles from './searchBar.module.css'
import {AiOutlineSearch} from "react-icons/ai";
import {useCallback, useState, KeyboardEvent, ChangeEvent} from "react";
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {getDataFromServerWithJson} from "@/lib-client/fetch";

interface props {
    isSearchMode: boolean;
}

export default function SearchBar(props: props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isTag, setIsTag] = useState(false)
    const router = useRouter();
    const className_0 = searchQuery === ''? classNames(styles.AiOutlineSearch) : classNames(styles.AiOutlineSearch, styles.active)
    const className_1 = props.isSearchMode? classNames(styles.div_0, styles.searchMode) : classNames(styles.div_0)

    const getSuggestions = async (searchQuery: string) => {

        return await getDataFromServerWithJson<{suggestions: string[], isTag: boolean, error: string}>(`/api/getSuggestions?search_query=${encodeURIComponent(searchQuery)}`)
    }

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        getSuggestions(e.target.value).then((json) => {
            console.log(json.suggestions)
            if(!json.error){
                console.log(json)
                setIsTag(json.isTag)
                setSuggestions(json.suggestions)
            }else{
                console.log(json.error)
            }
        })
    }


    const clickEventHandler_searchWithQuery = () => {
        if(searchQuery !== '') {
            console.log(searchQuery)
            if(searchQuery.startsWith('#')){
                router.push(`/tags/${searchQuery.slice(1)}`);
            }else {
                const params = new URLSearchParams({search_query: searchQuery});
                router.push(`/search?${params.toString()}`);
            }
        }
    }

    const keyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            clickEventHandler_searchWithQuery()
        }
    }

    const clickEventHandler_searchWithSuggestion = (suggestion: string, isTag: boolean) => {
        if(isTag) {
            router.push(`/tags/${suggestion}`);
            setSearchQuery(`#${suggestion}`)
            setSuggestions([])
        }else {
            const params = new URLSearchParams({search_query: searchQuery});
            router.push(`/search?${params.toString()}`);
            setSearchQuery(suggestion)
            setSuggestions([])
        }
    }


    return (
        <div className={className_1}>
            <div className={styles.div_1}>
                <input type={"text"} className={styles.input_0} placeholder={'記事を検索'} value={searchQuery}
                       onChange={(e) => changeEventHandler(e)} onKeyDown={keyDownEventHandler}/>
                <AiOutlineSearch className={className_0} onClick={clickEventHandler_searchWithQuery}/>
            </div>
            <div className={styles.div_4}>
                <div className={styles.div_2}>
                    {suggestions.map((suggestion, i) => <div className={styles.div_3} key={i} onClick={() => {
                        clickEventHandler_searchWithSuggestion(suggestion, isTag)
                    }}>{isTag ? `# ${suggestion}` : suggestion}</div>)}
                </div>
            </div>
        </div>
    )
}
