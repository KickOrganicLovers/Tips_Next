'use client';

import {EditorContent, useEditor} from "@tiptap/react";
import './createArticle.css'
import {StarterKit} from "@tiptap/starter-kit";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import EditorToolBar from "@/app/createArticle/_components/editingToolBar/editorToolBar";
import {bold_onClick, bold_setIsActive} from "@/redux/slices/articleEditorStatusSlice";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const editor = useEditor({
        extensions: [StarterKit],
        content: 'hello world'
    });

    useEffect(() => {
        editor?.chain().focus().toggleBold().run()
        console.log(ArticleEditorStatus.bold.variable)
    }, [ArticleEditorStatus.bold.variable])


    useEffect(() => {
        dispatch(bold_setIsActive(editor?.isActive('bold')))
    }, [editor?.isActive('bold')])


    return (
        <div>
            <EditorToolBar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )

}