import ImageInsertionCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/imageInsertionCard/imageInsertionCard";
import styles from './editorToolList.module.css'
import TagAdditionCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/tagAdditionCard/tagAdditionCard";
import CategoryAdditionCard
    from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/atoms/categoryAdditionCard/categoryAdditionCard";

export default function EditorToolList() {
    return (
        <ul className={styles.ul_0}>
            <ImageInsertionCard/>
            <TagAdditionCard/>
            <CategoryAdditionCard/>
        </ul>
    )
}