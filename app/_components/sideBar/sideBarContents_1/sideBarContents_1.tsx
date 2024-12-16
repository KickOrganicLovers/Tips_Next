import styles from "@/app/createArticle/_components/editorToolBar/atoms/buttonBold/buttonBold.module.css";
import {Editor} from "@tiptap/core";
import {bold_onClick} from "@/redux/slices/articleEditorStatusSlice";
import EditorToolBox from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolBox/editorToolBox";
import EditorToolList from "@/app/_components/sideBar/sideBarContents_1/atoms/editorToolList/editorToolList";

export default function SideBarContents_1() {

    return (
        <div>
            <EditorToolBox/>
            <EditorToolList/>
        </div>
    )
}