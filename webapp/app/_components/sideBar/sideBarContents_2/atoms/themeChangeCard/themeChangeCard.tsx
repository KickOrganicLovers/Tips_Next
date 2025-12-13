import styles from './themeChangeCard.module.css'
import {AiOutlineCheck} from "react-icons/ai";
import {useTheme} from "@/app/_components/themeProvider";


export default function ThemeChangeCard() {
    const { theme, changeTheme } = useTheme();

    return (
        <div className={styles.div_0}>
            <label className={styles.label_0}>
                <input type={'radio'} name={'theme'} className={styles.input_0} onChange={() => {changeTheme('system');localStorage.removeItem('theme')}} checked={theme === 'system'}/>
                <AiOutlineCheck className={styles.AiOutlineCheck}/>
                ブラウザのテーマ
            </label>
            <label className={styles.label_0}>
                <input type={'radio'} name={'theme'} className={styles.input_0} onChange={() => {changeTheme('light');localStorage.setItem('theme', 'light')}} checked={theme === 'light'}/>
                <AiOutlineCheck className={styles.AiOutlineCheck}/>
                ライト
            </label>
            <label className={styles.label_0}>
                <input type={'radio'} name={'theme'} className={styles.input_0} onChange={() => {changeTheme('dark');localStorage.setItem('theme', 'dark')}} checked={theme === 'dark'}/>
                <AiOutlineCheck className={styles.AiOutlineCheck}/>
                ダーク
            </label>
        </div>
    )
}
