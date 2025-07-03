import styles from './sideBarContents_2.module.css'
import {MdArrowBackIos, MdLogout, MdOutlinePalette} from "react-icons/md";
import {IoMdSettings} from "react-icons/io";
import {useEffect, useState} from "react";
import classNames from "classnames";
import AccountBanner from "@/app/_components/sideBar/sideBarContents_2/atoms/accountBanner/AccountBanner";
import {useSession, signOut} from "next-auth/react";
import {useAtom} from "jotai";
import {settingsAtom} from "@/lib/lib-client/atoms";
import {AiOutlineUserDelete} from "react-icons/ai";
import {SettingsMode} from "@/types";
import LogoutCard from "@/app/_components/sideBar/sideBarContents_2/atoms/logoutCard/logoutCard";
import ThemeChangeCard from "@/app/_components/sideBar/sideBarContents_2/atoms/themeChangeCard/themeChangeCard";
import UserDeletionCard
    from "@/app/_components/sideBar/sideBarContents_2/atoms/userDeletionCard/userDeletionCard";


export default function SideBarContents_2() {
    const [settingsMode, setSettingsMode] = useState<SettingsMode>('default');
    const [settings, setSettings] = useAtom(settingsAtom)
    const className = settingsMode !== 'default' ? classNames(styles.div_2, styles.active) : classNames(styles.div_2);


    useEffect(() => {
        setSettingsMode('default')
    }, [settings.isActive])

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div className={className}>
                    <div className={styles.div_3}>
                        <div className={styles.div_5}>
                            <IoMdSettings className={styles.IoMdSettings}/>
                            <h2 className={styles.h2_0}>個人用設定</h2>
                        </div>
                        <div className={styles.div_6}>
                            <div className={styles.div_7} onClick={() => {setSettingsMode('changeTheme')}}>
                                <MdOutlinePalette className={styles.MdOutlinePalette}/>
                                <p className={styles.p_0}>テーマの切り替え</p>
                            </div>
                            <div className={styles.div_7} onClick={() => {setSettingsMode('logout')}}>
                                <MdLogout className={styles.MdLogOut}/>
                                <p className={styles.p_0}>ログアウト</p>
                            </div>
                            <div className={classNames(styles.div_7, styles.deleteAccount)} onClick={() => {setSettingsMode('deleteAccount')}}>
                                <AiOutlineUserDelete className={styles.MdOutlinePalette}/>
                                <p className={styles.p_0}>アカウントの削除</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.div_4}>
                        <div className={styles.div_5}>
                            <MdArrowBackIos className={styles.MdArrowBackIos} onClick={() => {setSettingsMode('default')}}/>
                            <h2 className={styles.h2_0}>{(() => {
                                switch (settingsMode){
                                    case 'logout': return 'ログアウト'
                                    case 'changeTheme': return 'テーマの変更'
                                    case 'deleteAccount': return 'アカウントの削除'
                                    default: return '\u00A0'
                                }
                            })()}</h2>
                        </div>
                        {settingsMode === 'logout'?
                            <LogoutCard setSettingsMode={setSettingsMode}/>
                            : undefined
                        }
                        {settingsMode === 'changeTheme'?
                            <ThemeChangeCard/>
                            : undefined
                        }
                        {settingsMode === 'deleteAccount' ?
                            <UserDeletionCard setSettingsMode={setSettingsMode}/>
                        : undefined
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
