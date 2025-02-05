'use client';

import {EditorContent, useEditor} from "@tiptap/react";
import './createArticle.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {
    bold_onClick,
    bold_setIsActive, bulletList_setIsActive,
    codeBlock_setIsActive,
    heading_1_setIsActive,
    heading_2_setIsActive,
    highlight_setIsActive,
    italic_setIsActive, orderedList_setIsActive,
    strike_setIsActive, textAlign_center_setIsActive, textAlign_left_setIsActive, textAlign_right_setIsActive,
    underline_setIsActive
} from "@/redux/slices/articleEditorStatusSlice";
import TitleInputField from "@/app/createArticle/_components/titleInputField/titleInputField";
import styles from './createArticle.module.css'
import {Document} from "@tiptap/extension-document";
import {Paragraph} from "@tiptap/extension-paragraph";
import {Text} from "@tiptap/extension-text";
import {Bold} from "@tiptap/extension-bold";
import {Underline} from "@tiptap/extension-underline";
import {Italic} from "@tiptap/extension-italic";
import {Code} from "@tiptap/extension-code";
import {Highlight} from "@tiptap/extension-highlight";
import {Strike} from "@tiptap/extension-strike";
import {Link} from "@tiptap/extension-link";
import {Heading} from "@tiptap/extension-heading";
import {CodeBlock} from "@tiptap/extension-code-block";
import {ListItem} from "@tiptap/extension-list-item";
import {TextAlign} from "@tiptap/extension-text-align";
import {BulletList} from "@tiptap/extension-bullet-list";
import {OrderedList} from "@tiptap/extension-ordered-list";
import {Placeholder} from "@tiptap/extension-placeholder";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const editor = useEditor({
        extensions: [Document, Paragraph, Placeholder.configure({placeholder: '記事本文を入力...'}), Text, Bold, Underline, Strike, Italic, Code, Highlight, Link, Heading, CodeBlock, ListItem, TextAlign.configure({types: ['heading', 'paragraph'],}), BulletList, OrderedList],
        content: ''
    });

    useEffect(() => {
        editor?.chain().focus().toggleBold().run()
        console.log(ArticleEditorStatus.bold.variable)
    }, [ArticleEditorStatus.bold.variable])

    useEffect(() => {
        editor?.chain().focus().toggleUnderline().run()
        console.log(ArticleEditorStatus.underline.variable)
    }, [ArticleEditorStatus.underline.variable])

    useEffect(() => {
        editor?.chain().focus().toggleItalic().run()
        console.log(ArticleEditorStatus.italic.variable)
    }, [ArticleEditorStatus.italic.variable])

    useEffect(() => {
        editor?.chain().focus().toggleStrike().run()
        console.log(ArticleEditorStatus.strike.variable)
    }, [ArticleEditorStatus.strike.variable])

    useEffect(() => {
        editor?.chain().focus().toggleHeading({level: 2}).run()
        console.log(ArticleEditorStatus.heading_1.variable)
    }, [ArticleEditorStatus.heading_1.variable])

    useEffect(() => {
        editor?.chain().focus().toggleHeading({level: 3}).run()
        console.log(ArticleEditorStatus.heading_2.variable)
    }, [ArticleEditorStatus.heading_2.variable])

    useEffect(() => {
        editor?.chain().focus().toggleHighlight().run()
        console.log(ArticleEditorStatus.highlight.variable)
    }, [ArticleEditorStatus.highlight.variable])

    useEffect(() => {
        editor?.chain().focus().toggleCodeBlock().run()
        console.log(ArticleEditorStatus.codeBlock.variable)
    }, [ArticleEditorStatus.codeBlock.variable])

    useEffect(() => {
        editor?.chain().focus().toggleBulletList().run()
        console.log(ArticleEditorStatus.bulletList.variable)
    }, [ArticleEditorStatus.bulletList.variable])

    useEffect(() => {
        editor?.chain().focus().toggleOrderedList().run()
        console.log(ArticleEditorStatus.orderedList.variable)
    }, [ArticleEditorStatus.orderedList.variable])

    useEffect(() => {
        editor?.chain().focus().setTextAlign('left').run()
        console.log(ArticleEditorStatus.textAlign_left.variable)
    }, [ArticleEditorStatus.textAlign_left.variable])

    useEffect(() => {
        editor?.chain().focus().setTextAlign('center').run()
        console.log(ArticleEditorStatus.textAlign_center.variable)
    }, [ArticleEditorStatus.textAlign_center.variable])

    useEffect(() => {
        editor?.chain().focus().setTextAlign('right').run()
        console.log(ArticleEditorStatus.textAlign_right.variable)
    }, [ArticleEditorStatus.textAlign_right.variable])


    useEffect(() => {
        dispatch(bold_setIsActive(editor?.isActive('bold')))
    }, [editor?.isActive('bold')])

    useEffect(() => {
        dispatch(underline_setIsActive(editor?.isActive('underline')))
    }, [editor?.isActive('underline')])

    useEffect(() => {
        dispatch(italic_setIsActive(editor?.isActive('italic')))
    }, [editor?.isActive('italic')])

    useEffect(() => {
        dispatch(strike_setIsActive(editor?.isActive('strike')))
    }, [editor?.isActive('strike')])

    useEffect(() => {
        dispatch(heading_1_setIsActive(editor?.isActive('heading', {level: 2})))
    }, [editor?.isActive('heading', {level: 2})])

    useEffect(() => {
        dispatch(heading_2_setIsActive(editor?.isActive('heading', {level: 3})))
    }, [editor?.isActive('heading', {level: 3})])

    useEffect(() => {
        dispatch(highlight_setIsActive(editor?.isActive('highlight')))
    }, [editor?.isActive('highlight')])

    useEffect(() => {
        dispatch(codeBlock_setIsActive(editor?.isActive('codeBlock')))
    }, [editor?.isActive('codeBlock')])

    useEffect(() => {
        dispatch(bulletList_setIsActive(editor?.isActive('bulletList')))
    }, [editor?.isActive('bulletList')])

    useEffect(() => {
        dispatch(orderedList_setIsActive(editor?.isActive('orderedList')))
    }, [editor?.isActive('orderedList')])


    useEffect(() => {
        dispatch(textAlign_left_setIsActive(editor?.isActive({textAlign: 'left'})))
    }, [editor?.isActive({textAlign: 'left'})])

    useEffect(() => {
        dispatch(textAlign_center_setIsActive(editor?.isActive({textAlign: 'center'})))
    }, [editor?.isActive({textAlign: 'center'})])

    useEffect(() => {
        dispatch(textAlign_right_setIsActive(editor?.isActive({textAlign: 'right'})))
    }, [editor?.isActive({textAlign: 'right'})])


    useEffect(() => {
        dispatch(applyWhereIam('createArticle'))
    }, [])

    return (
        <div className={styles.div_0}>
            <TitleInputField/>
            <EditorContent editor={editor} placeholder={'記事本文を入力...'}/>
        </div>
    )

}
