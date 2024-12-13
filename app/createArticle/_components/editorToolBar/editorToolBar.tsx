import {Editor} from "@tiptap/core";
import ButtonBold from "@/app/createArticle/_components/editorToolBar/atoms/buttonBold/buttonBold";
import styles from './editorToolBar.module.css'

interface props {
    editor: Editor | null
}

//This is a virtual component for reference isn't displayed on the screen.
export default function EditorToolBar(props: props) {
    return(
        <div className={styles.div_0}>
            <ButtonBold editor={props.editor}/>
        </div>
    )
}