import styles from './tagAdditionCard.module.css'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Tag from "@/app/_components/sideBar/sideBarContents_1/atoms/tagAdditionCard/atoms/tag";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleSchemeWithPrefix} from "@/types";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import { useEventsStore } from '@/lib/lib-client/stores/eventsStore';

interface props {
    tags: string[]
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
}

export default function TagAdditionCard(props: props) {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isInputFocused, setIsInputFocused] = useState<boolean>(true)
    const appendError = useErrorStore(state => state.appendError)

    const editorEvent = useEventsStore(state => state.events.editorEvent)


    const setTag = (tag: string) => {
        if(props.tags.length < 6) {
            if (tag.trim() === "") return;
            props.setArticleOnEdit((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, tag]
            }))
            setInputValue("");
        }else {
            setError('タグは6つまで追加可能です。')
        }
    }

    const getSuggestions = async (search_query: string) => {
        return await getDataFromServerWithJson<{
            suggestions: string[],
            isTag: boolean,
        }>(`/api/getSuggestions?search_query=${encodeURIComponent('#' + search_query)}`)
    }


    useEffect(() => {
        getSuggestions(inputValue).then((json) => {
            if (!!json) {
                setSuggestions(json.suggestions)
            }
        }).catch(error => {
            appendError(error)
        })
    }, [inputValue]);

    useEffect(() => {
        setInputValue('')
    }, [editorEvent?.payload.upload]);



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <button className={styles.button_0} onClick={() => {
                    setTag(inputValue)
                }}>追加
                </button>
                <p className={styles.p_0}>＃</p>
                <input type='text' className={styles.input_0} value={inputValue}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           setInputValue(e.target.value)
                       }} onFocus={() => {
                    setIsInputFocused(true)
                }} onBlur={() => {
                    setTimeout(() => setIsInputFocused(false), 100)
                }}/>
            </div>
            <div className={styles.div_2}>
                {isInputFocused ? (
                    <div className={styles.div_3}>
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className={styles.div_4} onClick={() => {
                                setTag(suggestion);
                                setSuggestions([])
                            }}>
                                {'＃ ' + suggestion}
                            </div>
                        ))}
                    </div>
                ) : undefined}
            </div>
            <div className={styles.div_5}>
                {props.tags.map((tag, i) => (<Tag tagName={tag} key={i} index={i} setError={setError} setArticleOnEdit={props.setArticleOnEdit}/>))}
                <p className={styles.p_1}>{error}</p>
            </div>
        </div>
    )
}
