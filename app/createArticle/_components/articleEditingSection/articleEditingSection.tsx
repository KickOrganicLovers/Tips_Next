'use client';

import {EditorContent, useEditor} from "@tiptap/react";
import './articleEditingSection.css'
import React, {Dispatch, SetStateAction, useEffect, useRef} from "react";
import TitleInputField
    from "@/app/createArticle/_components/articleEditingSection/atoms/titleInputField/titleInputField";
import styles from './articleEditingSection.module.css'
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
import {Image as TipTapImage} from "@tiptap/extension-image";
import {ArticleEditorStatusScheme, ArticleSchemeWithPrefix} from "@/types";

type editorMode = 'toolBar' | 'both'

interface props {
    title: string,
    contents: string,
    editorMode: editorMode,
    setEditorMode: Dispatch<SetStateAction<editorMode>>
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
    articleEditorStatus: ArticleEditorStatusScheme,
    setArticleEditorStatus: Dispatch<SetStateAction<ArticleEditorStatusScheme>>
}
export default function ArticleEditingSection(props: props) {
    const inputImageRef = useRef<HTMLInputElement>(null);
    const hasMounted = useRef(true);
    const classname = `${styles['div_0']} ${styles[props.editorMode]}`

    const editor = useEditor({
        extensions: [Document, Paragraph, Placeholder.configure({placeholder: '記事本文を入力...'}), Text, Bold, Underline, Strike, Italic, Code, Highlight, Link, Heading, CodeBlock, ListItem, TextAlign.configure({types: ['heading', 'paragraph'],}), BulletList, OrderedList, TipTapImage.configure({allowBase64: true})],
        content: '',
        onUpdate: ({editor}) => {
            props.setArticleOnEdit((prevState) => ({
                ...prevState,
                contents: editor.getHTML()
            }))
        }
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== props.contents) {
            editor.commands.setContent(props.contents);
        }
    }, [props.contents, editor]);


    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleBold().run()
        }
    }, [props.articleEditorStatus.decorations.bold.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleUnderline().run()
        }
    }, [props.articleEditorStatus.decorations.underline.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleItalic().run()
        }
    }, [props.articleEditorStatus.decorations.italic.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleStrike().run()
        }
    }, [props.articleEditorStatus.decorations.strike.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHeading({level: 2}).run()
        }
    }, [props.articleEditorStatus.decorations.heading_1.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHeading({level: 3}).run()
        }

    }, [props.articleEditorStatus.decorations.heading_2.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHighlight().run()
        }
    }, [props.articleEditorStatus.decorations.highlight.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleCodeBlock().run()
        }
    }, [props.articleEditorStatus.decorations.codeBlock.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleBulletList().run()
        }
    }, [props.articleEditorStatus.decorations.bulletList.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleOrderedList().run()
        }
    }, [props.articleEditorStatus.decorations.orderedList.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('left').run()
        }
    }, [props.articleEditorStatus.decorations.textAlign_left.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('center').run()
        }
    }, [props.articleEditorStatus.decorations.textAlign_center.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('right').run()
        }
    }, [props.articleEditorStatus.decorations.textAlign_right.variable])


    useEffect(() => {
        if (!hasMounted.current) {
            inputImageRef.current?.click()
        }
    }, [props.articleEditorStatus.controls.image.variable]);


    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                bold: {...prevState.decorations.bold, isActive: editor?.isActive('bold') as boolean}
            }
        }))
    }, [editor?.isActive('bold')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                underline: {...prevState.decorations.underline, isActive: editor?.isActive('underline') as boolean}
            }
        }))
    }, [editor?.isActive('underline')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                italic: {...prevState.decorations.italic, isActive: editor?.isActive('italic') as boolean}
            }
        }))
    }, [editor?.isActive('italic')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                strike: {...prevState.decorations.strike, isActive: editor?.isActive('strike') as boolean}
            }
        }))
    }, [editor?.isActive('strike')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                heading_1: {...prevState.decorations.heading_1, isActive: editor?.isActive('heading', {level: 2}) as boolean}
            }
        }))
    }, [editor?.isActive('heading', {level: 2})])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                heading_2: {...prevState.decorations.heading_2, isActive: editor?.isActive('heading', {level: 3}) as boolean}
            }
        }))
    }, [editor?.isActive('heading', {level: 3})])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                highlight: {...prevState.decorations.highlight, isActive: editor?.isActive('highlight') as boolean}
            }
        }))
    }, [editor?.isActive('highlight')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                codeBlock: {...prevState.decorations.codeBlock, isActive: editor?.isActive('codeBlock') as boolean}
            }
        }))
    }, [editor?.isActive('codeBlock')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                bulletList: {...prevState.decorations.bulletList, isActive: editor?.isActive('bulletList') as boolean}
            }
        }))
    }, [editor?.isActive('bulletList')])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                orderedList: {...prevState.decorations.orderedList, isActive: editor?.isActive('orderedList') as boolean}
            }
        }))
    }, [editor?.isActive('orderedList')])


    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_left: {...prevState.decorations.textAlign_left, isActive: editor?.isActive({textAlign: 'left'}) as boolean}
            }
        }))
    }, [editor?.isActive({textAlign: 'left'})])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_center: {
                    ...prevState.decorations.textAlign_center,
                    isActive: editor?.isActive({textAlign: 'center'}) as boolean
                }
            }
        }))
    }, [editor?.isActive({textAlign: 'center'})])

    useEffect(() => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_right: {...prevState.decorations.textAlign_right, isActive: editor?.isActive({textAlign: 'right'}) as boolean}
            }
        }))
    }, [editor?.isActive({textAlign: 'right'})])



    useEffect(() => {
        hasMounted.current = false;
    }, [])


    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const img = new Image()
                    img.src = event.target.result.toString()

                    img.onload = () => {
                        const fixedHeight = 300
                        const scale = fixedHeight / img.height
                        const newWidth = img.width * scale

                        const canvas = document.createElement('canvas')
                        canvas.width = newWidth
                        canvas.height = fixedHeight

                        const ctx = canvas.getContext('2d')
                        if (ctx) {
                            ctx.drawImage(img, 0, 0, newWidth, fixedHeight)
                            const compressedData = canvas.toDataURL('image/jpeg', 0.8) // 圧縮品質 80%

                            if (editor) {
                                editor.chain().focus().createParagraphNear().setImage({ src: compressedData }).createParagraphNear().run()
                            }
                        }
                    }
                }
            }
            reader.readAsDataURL(file)
        }
    }



    return (
        <div className={classname}>
            <TitleInputField title={props.title} setArticleOnEdit={props.setArticleOnEdit}/>
            <EditorContent editor={editor} placeholder={'記事本文を入力...'} className={styles.editorWrapper}/>
            <input className={styles.input_0} type='file' accept='image/*' ref={inputImageRef} onChange={onFileChange}/>
        </div>
    )

}
