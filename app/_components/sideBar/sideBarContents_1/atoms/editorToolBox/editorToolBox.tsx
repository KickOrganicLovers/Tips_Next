import styles from './editorToolBox.module.css'
import EditorToolButton from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolBox/atoms/editorToolButton/editorToolButton";
import EditorToolGuide
        from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolBox/atoms/editorToolGuide/editorToolGuide";

export default function EditorToolBox() {
    return (
        <div className={styles.div_0}>
            {/*<EditorToolGuide/>*/}
            <EditorToolButton extension={'bold'} index={1}/>
            <EditorToolButton extension={'underline'} index={2}/>
            <EditorToolButton extension={'italic'} index={3}/>
            <EditorToolButton extension={'strike'} index={4}/>
            <EditorToolButton extension={'heading_1'} index={5}/>
            <EditorToolButton extension={'heading_2'} index={6}/>
            <EditorToolButton extension={'highlight'} index={7}/>
            <EditorToolButton extension={'codeBlock'} index={8}/>
            <EditorToolButton extension={'bulletList'} index={9}/>
            <EditorToolButton extension={'orderedList'} index={10}/>
            <EditorToolButton extension={'textAlign_left'} index={11}/>
            <EditorToolButton extension={'textAlign_center'} index={12}/>
            <EditorToolButton extension={'textAlign_right'} index={13}/>

        </div>
    )
}