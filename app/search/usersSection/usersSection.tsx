import styles from './usersSection.module.css'
import {UserScheme} from "@/types";
import UserContainer from "@/app/_components/common/userContainer/userContainer";
import React, {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";

interface props {
    users: UserScheme[]
    setUsers: Dispatch<SetStateAction<UserScheme[]>>
    pageMode: 'articles' | 'users'
}

export default function UsersSection(props: props) {

    return (
        <div className={styles.div_0} style={props.pageMode !== 'users' ? {display: "none"} : {}}>
            {props.users.map((user: UserScheme, index: number) =>
                <UserContainer user={user} setUsers={props.setUsers} key={index}/>
            )}
            {props.users.length === 0?
                <div className={styles.div_1}>
                    <BoyWithCompass className={styles.BoyWithCompass}/>
                    <h2 className={styles.h2_0}>ユーザーが見つかりませんでした</h2>
                    <h3 className={styles.h3_0}>No users found</h3>
                </div>
                :
                undefined
            }
        </div>
    )
}
