import ImageInsertionCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/imageInsertionCard/imageInsertionCard";
import styles from './editorToolList.module.css'
import ArticleSettingsCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/articleSettingsCard/articleSettingsCard";
import ArticleUploadingCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/articleUploadingCard/articleUploadingCard";

export default function EditorToolList() {
    return (
        <ul className={styles.ul_0}>
            <ImageInsertionCard/>
            <ArticleSettingsCard/>
            <ArticleUploadingCard/>
        </ul>
    )
}
