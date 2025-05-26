import styles from './usersSection.module.css'
import {UserProfileScheme} from "@/types";
import UserContainer from "@/app/_components/common/userContainer/userContainer";
import {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";

interface props {
    users: UserProfileScheme[]
    setUsers: Dispatch<SetStateAction<UserProfileScheme[]>>
    pageMode: 'articles' | 'users'
}

export default function UsersSection(props: props) {

    return (
        <div className={styles.div_0} style={props.pageMode !== 'users' ? {display: "none"} : {}}>
            {props.users.map((user: UserProfileScheme, index: number) =>
                <UserContainer userProfile={user} setUsers={props.setUsers} key={index}/>
            )}
        </div>
    )
}
