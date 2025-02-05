import styles from './sideBarContents_1.module.css'
import EditorToolBox from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolBox/editorToolBox";
import EditorToolList from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/editorToolList";

export default function SideBarContents_1() {

    return (
        <div className={styles.div_0}>
            <EditorToolBox/>
            <div className={styles.div_1}></div>
            <EditorToolList/>
        </div>
    )
}
