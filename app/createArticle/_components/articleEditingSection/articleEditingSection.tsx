'use client';

import {EditorContent, useEditor} from "@tiptap/react";
import './articleEditingSection.css'
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
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
import TitleInputField from "@/app/createArticle/_components/articleEditingSection/atoms/titleInputField/titleInputField";
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
import {applyWhereIam} from "@/redux/slices/whereIamSlice";


interface props {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    setContents: Dispatch<SetStateAction<string>>
}
export default function ArticleEditingSection(props: props) {

    const dispatch = useDispatch<AppDispatch>();
    const inputImageRef = useRef<HTMLInputElement>(null);
    const hasMounted = useRef(true);
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)

    const editor = useEditor({
        extensions: [Document, Paragraph, Placeholder.configure({placeholder: '記事本文を入力...'}), Text, Bold, Underline, Strike, Italic, Code, Highlight, Link, Heading, CodeBlock, ListItem, TextAlign.configure({types: ['heading', 'paragraph'],}), BulletList, OrderedList, TipTapImage.configure({allowBase64: true})],
        content: '',
        onUpdate: ({editor}) => {
            props.setContents(editor.getHTML())
        }

    });


    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleBold().run()
        }
    }, [ArticleEditorStatus.bold.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleUnderline().run()
        }
    }, [ArticleEditorStatus.underline.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleItalic().run()
        }
    }, [ArticleEditorStatus.italic.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleStrike().run()
        }
    }, [ArticleEditorStatus.strike.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHeading({level: 2}).run()
        }
    }, [ArticleEditorStatus.heading_1.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHeading({level: 3}).run()
        }

    }, [ArticleEditorStatus.heading_2.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleHighlight().run()
        }
    }, [ArticleEditorStatus.highlight.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleCodeBlock().run()
        }
    }, [ArticleEditorStatus.codeBlock.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleBulletList().run()
        }
    }, [ArticleEditorStatus.bulletList.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().toggleOrderedList().run()
        }
    }, [ArticleEditorStatus.orderedList.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('left').run()
        }
    }, [ArticleEditorStatus.textAlign_left.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('center').run()
        }
    }, [ArticleEditorStatus.textAlign_center.variable])

    useEffect(() => {
        if (!hasMounted.current) {
            editor?.chain().focus().setTextAlign('right').run()
        }
    }, [ArticleEditorStatus.textAlign_right.variable])


    useEffect(() => {
        if (!hasMounted.current) {
            inputImageRef.current?.click()
        }
    }, [ArticleEditorStatus.image.variable]);


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
        hasMounted.current = false;
        dispatch(applyWhereIam('createArticle'))
    }, [])

    // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             if (reader.result) {
    //                 if(editor){
    //                     editor.chain().focus().setImage({ src: reader.result.toString()}).run()
    //                 }
    //             }
    //         }
    //         reader.readAsDataURL(e.target.files[0])
    //     }
    // }

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
        <div className={styles.div_0}>
            <TitleInputField title={props.title} setTitle={props.setTitle} />
            <EditorContent editor={editor} placeholder={'記事本文を入力...'}/>
            <input className={styles.input_0} type='file' accept='image/*' ref={inputImageRef} onChange={onFileChange}/>
        </div>
    )

}
