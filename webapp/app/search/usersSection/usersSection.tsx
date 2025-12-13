import styles from './usersSection.module.css'
import {ErrorScheme, UserScheme} from "@/types";
import UserContainer from "@/app/_components/common/userContainer/userContainer";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";

interface props {
    query: string;
    pageMode: 'articles' | 'users'
}

export default function UsersSection(props: props) {
    const [viewingUsers, setViewingUsers] = useState<UserScheme[]>([]);
    const [isMax, setIsMax] = useState<boolean>(false)
    const appendError = useErrorStore(state => state.appendError)

    const searchUsers = async () => {
        try{
            const json = await getDataFromServerWithJson<{users: UserScheme[]}>(`/api/searchUser?search_query=${props.query}`)
            if(!!json){
                setViewingUsers((prevState) => [...prevState, ...json.users])
                if(json.users.length < 30) setIsMax(true)
            }
        }catch (error) {
            appendError(error as ErrorScheme)
        }
    }

    useEffect(() => {
        setViewingUsers([])
        setIsMax(false)
    }, [props.query]);


    return (
        <div className={styles.div_0} style={props.pageMode !== 'users' ? {display: "none"} : {}}>
            {!isMax && Array.from({length: 30}).map((_, index) => (
                <UserContainer isDummy={true} isFirstDummy={index === 0} firstDummy_onVisible={searchUsers} key={index}/>
            ))}
            {viewingUsers.map((user: UserScheme, index: number) =>
                <UserContainer user={user} setUsers={setViewingUsers} key={index}/>
            )}
            {viewingUsers.length === 0 && isMax?
                <div className={styles.div_1}>
                    <BoyWithCompass className={styles.BoyWithCompass}/>
                    <h2 className={styles.h2_0}>ユーザーが見つかりませんでした</h2>
                    <h3 className={styles.h3_0}>No users found</h3>
                </div>
                :
                null
            }
        </div>
    )
}
