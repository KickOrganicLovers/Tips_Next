'use client';

import {EditorContent, useEditor, useEditorState} from "@tiptap/react";
import './articleEditingSection.css'
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
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
import {ArticleScheme, ArticleSchemeWithPrefix, ToolButtonStatusScheme} from "@/types";
import {Blockquote} from "@tiptap/extension-blockquote";
import {useAtom} from "jotai/index";
import {articleOnEditAtom} from "@/lib/lib-client/atoms";
import {useSession} from "next-auth/react";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useRouter} from "next/navigation";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";
import {UrlInsertingCard} from "@/app/createArticle/_components/urlInsertingCard/urlInsertingCard";
import {Editor} from "@tiptap/core";
import {OgpCard} from "@/lib/lib-client/tiptapExtensions/ogpCard/ogpCard";
import { useEventsStore } from "@/lib/lib-client/stores/eventsStore";
import { stat } from "fs";
import { emit } from "process";

type editorMode = 'toolBar' | 'both'

const initialArticleOnEdit: ArticleSchemeWithPrefix = {
    title: '',
    thumbnailImageAsBase64: '',
    thumbnailImageUrl: '',
    contents: '',
    tags: [],
    categoryId: '',
    authorId: ''
}

interface props {
    editorMode: editorMode,
    setEditorMode: Dispatch<SetStateAction<editorMode>>
    toolButtonStatus: ToolButtonStatusScheme,
    setToolButtonStatus: Dispatch<SetStateAction<ToolButtonStatusScheme>>
}


export default function ArticleEditingSection(props: props) {
    const router = useRouter()

    const [errors, setErrors] = useState<string[]>([]);

    const inputImageRef = useRef<HTMLInputElement>(null);
    const hasMounted = useRef(true);
    const classname = `${styles['div_0']} ${styles[props.editorMode]}`

    const [articleOnEdit, setArticleOnEdit] = useAtom(articleOnEditAtom)
    const [previousArticle, setPreviousArticle] = useState<ArticleSchemeWithPrefix>()

    const editorEvent = useEventsStore(state => state.events.editorEvent)
    const emit = useEventsStore(state => state.emit)



    const session = useSession()
    const uploadArticle = useUserStore(state => state.uploadArticle)


    const editor = useEditor({
        extensions: [Document, Paragraph, Placeholder.configure({placeholder: '記事本文を入力...'}), Text, Bold, Underline, Strike, Italic, Code, Highlight, Link, Heading, CodeBlock, ListItem, TextAlign.configure({types: ['heading', 'paragraph'],}), BulletList, OrderedList, TipTapImage.configure({allowBase64: true}), Blockquote, Link, OgpCard],
        content: '',
        onUpdate: ({editor}) => {
            setArticleOnEdit((prevState) => ({
                ...prevState,
                contents: editor.getHTML()
            }))
        }
    });



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

    const checkErrors = () => {
        const errors: string[] = [];
        if (!articleOnEdit.title) {
            errors.push('タイトルを設定してください。')
        }
        if (!articleOnEdit.contents) {
            errors.push('記事が空白です。')
        }
        if (!articleOnEdit.thumbnailImageAsBase64 && !articleOnEdit.thumbnailImageUrl) {
            errors.push('サムネイル画像を選択してください。')
        }
        if (!articleOnEdit.categoryId) {
            errors.push('カテゴリーを選択してください。')
        }
        if (!articleOnEdit.tags || articleOnEdit.tags.length === 0) {
            errors.push('タグを追加してください。')
        }
        return errors
    }

    const resetToolButtonStatus = () => {
        props.setToolButtonStatus(
            {
                    decorations:{
        bold: false,
        underline: false,
        italic: false,
        strike: false,
        heading_1: false,
        heading_2: false,
        highlight: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        textAlign_left: false,
        textAlign_center: false,
        textAlign_right: false,
        blockQuote: false,
    },
    controls: {
        image: false,
        link: false,
        settings: false,
        upload: false,
        cancel: false,
    }
            }
        )
    }




    useEffect(() => {
        if (session.status ==='authenticated') {
            if (hasMounted) {
                const articleToEditAsString = sessionStorage.getItem('articleToEdit');
                if (articleToEditAsString) {
                    const articleToEdit: ArticleScheme = JSON.parse(articleToEditAsString)
                    console.log(articleToEdit)
                    setArticleOnEdit({
                        id: articleToEdit.id,
                        title: articleToEdit.title,
                        contents: articleToEdit.contents,
                        thumbnailImageUrl: articleToEdit.thumbnailImageUrl,
                        tags: articleToEdit.tags.map(tag => tag.tagName),
                        categoryId: articleToEdit.categoryId,
                        category: articleToEdit.category,
                        previousContents: articleToEdit.contents,
                        authorId: articleToEdit.authorId,
                    })
                    setPreviousArticle({
                        id: articleToEdit.id,
                        title: articleToEdit.title,
                        contents: articleToEdit.contents,
                        thumbnailImageUrl: articleToEdit.thumbnailImageUrl,
                        tags: articleToEdit.tags.map(tag => tag.tagName),
                        categoryId: articleToEdit.categoryId,
                        category: articleToEdit.category,
                        previousContents: articleToEdit.contents,
                        authorId: articleToEdit.authorId,
                    })

                    sessionStorage.removeItem('articleToEdit');
                }
            }
        } else {
            router.push('/login')
        }
    }, []);

    //toolbarのuploadボタンが押されたときに発火する
    useEffect(() => {
        if(!editor && !editorEvent) return
        if(!!editorEvent?.payload.click?.decorations){
            switch(editorEvent.payload.click.decorations){
                case "bold":
                    editor?.chain().focus().toggleBold().run()
                    break;
                case "underline":
                    editor?.chain().focus().toggleUnderline().run()
                    break;
                case "italic":
                    editor?.chain().focus().toggleItalic().run()
                    break;
                case "strike":
                    editor?.chain().focus().toggleStrike().run()
                    break;
                case "heading_1":
                    editor?.chain().focus().toggleHeading({level: 2}).run()
                    break;
                case "heading_2":
                    editor?.chain().focus().toggleHeading({level: 3}).run()
                    break;
                case "highlight":
                    editor?.chain().focus().toggleHighlight().run()
                    break;
                case "codeBlock":
                    editor?.chain().focus().toggleCodeBlock().run()
                    break;
                case "bulletList":
                    editor?.chain().focus().toggleBulletList().run()
                    break;
                case "orderedList":
                    editor?.chain().focus().toggleOrderedList().run()
                    break;
                case "textAlign_left":
                    editor?.chain().focus().setTextAlign('left').run()
                    break;
                case "textAlign_right":
                    editor?.chain().focus().setTextAlign('right').run()
                    break;
                case "textAlign_center":
                    editor?.chain().focus().setTextAlign('center').run()
                    break;
                case "blockQuote":
                    editor?.chain().focus().toggleBlockquote().run()
                    break;
            }
        }else if(editorEvent?.payload.click?.controls){
            switch(editorEvent?.payload.click?.controls){
                case "image":
                    props.setToolButtonStatus((prevState) => ({
                        ...prevState,
                        controls: {
                            ...prevState.controls,
                            image: true
                        }}))
                    inputImageRef.current?.click()

                    // フォーカスが戻ったときに「閉じた」とみなす
                    const handleWindowFocus = () => {
                        setTimeout(() => {
                            console.log('📂 ファイルダイアログが閉じられました（選択 or キャンセル）');
                            props.setToolButtonStatus((prevState) => ({
                                ...prevState,
                                controls: {
                                    ...prevState.controls,
                                    image: false
                                }
                            }))
                        }, 200); // 適切な遅延（少し余裕を持たせて）
                    };

                    // フォーカス復帰を1回だけ検知
                    window.addEventListener('focus', handleWindowFocus, { once: false });
                    break;
                case "link":
                    props.setToolButtonStatus((prevState) => ({
                        ...prevState,
                        controls: {
                            ...prevState.controls,
                            link: true
                    }}))
                    break;
                case "settings":
                case "upload":
                    if (session.status ==='authenticated') {
                        if (checkErrors().length === 0) {
                            uploadArticle(session, articleOnEdit)
                            router.push('/')
                            resetToolButtonStatus()
                            setArticleOnEdit(initialArticleOnEdit)
                            emit('editorEvent', {upload: true})
                        } else {
                            setErrors(checkErrors())
                        }
                    }
                    break;
                case "cancel":
                    router.push('/')
                    resetToolButtonStatus()
                    setArticleOnEdit(initialArticleOnEdit)
                    emit('editorEvent', {upload: false})
                    break;
            }
        }


    }, [editorEvent]);



    useEffect(() => {
        if (editor && editor.getHTML() !== articleOnEdit.contents) {
            editor.commands.setContent(articleOnEdit.contents);
        }
    }, [articleOnEdit.contents, editor]);



    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                bold: editor?.isActive('bold') as boolean
            }
        }))
    }, [editor?.isActive('bold')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                underline: editor?.isActive('underline') as boolean
            }
        }))
    }, [editor?.isActive('underline')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                italic: editor?.isActive('italic') as boolean
            }
        }))
    }, [editor?.isActive('italic')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                strike: editor?.isActive('strike') as boolean
            }
        }))
    }, [editor?.isActive('strike')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                heading_1: editor?.isActive('heading', {level: 2}) as boolean
            }
        }))
    }, [editor?.isActive('heading', {level: 2})])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                heading_2: editor?.isActive('heading', {level: 3}) as boolean
            }
        }))
    }, [editor?.isActive('heading', {level: 3})])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                highlight: editor?.isActive('highlight') as boolean
            }
        }))
    }, [editor?.isActive('highlight')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                codeBlock: editor?.isActive('codeBlock') as boolean
            }
        }))
    }, [editor?.isActive('codeBlock')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                bulletList: editor?.isActive('bulletList') as boolean
            }
        }))
    }, [editor?.isActive('bulletList')])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                orderedList: editor?.isActive('orderedList') as boolean
            }
        }))
    }, [editor?.isActive('orderedList')])


    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_left: editor?.isActive({textAlign: 'left'}) as boolean
            }
        }))
    }, [editor?.isActive({textAlign: 'left'})])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_center: editor?.isActive({textAlign: 'center'}) as boolean
            }
        }))
    }, [editor?.isActive({textAlign: 'center'})])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                textAlign_right: editor?.isActive({textAlign: 'right'}) as boolean
            }
        }))
    }, [editor?.isActive({textAlign: 'right'})])

    useEffect(() => {
        props.setToolButtonStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                blockQuote: editor?.isActive('blockquote') as boolean
            }
        }))
    }, [editor?.isActive('blockquote')])


    useEffect(() => {
        hasMounted.current = false;
    }, [])




    return (
        <div className={classname}>
            <TitleInputField title={articleOnEdit.title} setArticleOnEdit={setArticleOnEdit}/>
            <EditorContent editor={editor} placeholder={'記事本文を入力...'} className={styles.editorWrapper}/>
            <input className={styles.input_0} type='file' accept='image/*' ref={inputImageRef} onChange={onFileChange}/>

            {(() => {
                if((!!errors && errors.length > 0) || props.toolButtonStatus.controls.link){
                    return <div className={styles.FadeLayer}>
                    </div>
                }
            })()}
            {(() => {
                if(!!errors && errors.length > 0){
                    return <ErrorsCard errors={errors} setErrors={setErrors}/>
                }
            })()}
            {(() => {
                if(props.toolButtonStatus.controls.link){
                    return <UrlInsertingCard setToolButtonStatus={props.setToolButtonStatus} editor={editor as Editor}/>
                }
            })()}
        </div>
    )

}
