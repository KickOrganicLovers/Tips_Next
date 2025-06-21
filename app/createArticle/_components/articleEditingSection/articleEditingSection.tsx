'use client';

import {EditorContent, useEditor} from "@tiptap/react";
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
import {ArticleEditorStatusScheme, ArticleScheme, ArticleSchemeWithPrefix} from "@/types";
import {Blockquote} from "@tiptap/extension-blockquote";
import {useAtom} from "jotai/index";
import {articleEditorStatusAtom, articleOnEditAtom} from "@/lib/lib-client/atoms";
import {useSession} from "next-auth/react";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useRouter} from "next/navigation";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";
import {UrlInsertingCard} from "@/app/createArticle/_components/urlInsertingCard/urlInsertingCard";
import {Editor} from "@tiptap/core";
import {OgpCard} from "@/lib/lib-client/tiptapExtensions/ogpCard/ogpCard";

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
    articleEditorStatus: ArticleEditorStatusScheme,
    setArticleEditorStatus: Dispatch<SetStateAction<ArticleEditorStatusScheme>>
}


export default function ArticleEditingSection(props: props) {
    const router = useRouter()

    const [errors, setErrors] = useState<string[]>([]);

    const inputImageRef = useRef<HTMLInputElement>(null);
    const hasMounted = useRef(true);
    const classname = `${styles['div_0']} ${styles[props.editorMode]}`

    const [articleOnEdit, setArticleOnEdit] = useAtom(articleOnEditAtom)
    const [previousArticle, setPreviousArticle] = useState<ArticleSchemeWithPrefix>()



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

    const resetArticleEditorStatus = () => {
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                bold: {
                    isActive: false,
                    variable: false
                },
                underline: {
                    isActive: false,
                    variable: false
                },
                italic: {
                    isActive: false,
                    variable: false
                },
                strike: {
                    isActive: false,
                    variable: false
                },
                heading_1: {
                    isActive: false,
                    variable: false
                },
                heading_2: {
                    isActive: false,
                    variable: false
                },
                highlight: {
                    isActive: false,
                    variable: false
                },
                codeBlock: {
                    isActive: false,
                    variable: false
                },
                bulletList: {
                    isActive: false,
                    variable: false
                },
                orderedList: {
                    isActive: false,
                    variable: false
                },
                textAlign_left: {
                    isActive: false,
                    variable: false
                },
                textAlign_center: {
                    isActive: false,
                    variable: false
                },
                textAlign_right: {
                    isActive: false,
                    variable: false
                },
                blockQuote: {
                    isActive: false,
                    variable: false
                },
            }
            ,
            controls: {
                image: {
                    ...prevState.controls.image,
                    isActive: false,
                },
                link: {
                    ...prevState.controls.link,
                    isActive: false,
                },
                settings: {
                    ...prevState.controls.settings,
                    isActive: false,
                },
                upload: {
                    ...prevState.controls.upload,
                    isActive: false,
                },
                cancel: {
                    ...prevState.controls.cancel,
                    isActive: false,
                }
            }
        }))
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
        if (!hasMounted.current && session.status ==='authenticated') {
            if (checkErrors().length === 0) {
                uploadArticle(session, articleOnEdit)
                router.push('/')
                resetArticleEditorStatus()
                setArticleOnEdit(initialArticleOnEdit)
            } else {
                setErrors(checkErrors())
            }
        }else {
        }
    }, [props.articleEditorStatus.controls.upload.variable]);


    useEffect(() => {
        if (!hasMounted.current) {
            router.push('/')
            resetArticleEditorStatus()
            setArticleOnEdit(initialArticleOnEdit)
        }
    }, [props.articleEditorStatus.controls.cancel.variable]);


    useEffect(() => {
        if (!hasMounted.current) {
            props.setArticleEditorStatus((prevState) => ({
                ...prevState,
                controls: {
                    ...prevState.controls,
                    link: {
                        ...prevState.controls.link,
                        isActive: true,
                    }
                }
            }))
        }
    }, [props.articleEditorStatus.controls.link.variable]);



    useEffect(() => {
        if (!hasMounted.current) {
            props.setArticleEditorStatus((prevState) => ({
                ...prevState,
                controls: {
                    ...prevState.controls,
                    image: {
                        ...prevState.controls.image,
                        isActive: true,
                    }
                }
            }))
            inputImageRef.current?.click()

            // フォーカスが戻ったときに「閉じた」とみなす
            const handleWindowFocus = () => {
                setTimeout(() => {
                    console.log('📂 ファイルダイアログが閉じられました（選択 or キャンセル）');
                    props.setArticleEditorStatus((prevState) => ({
                        ...prevState,
                        controls: {
                            ...prevState.controls,
                            image: {
                                ...prevState.controls.image,
                                isActive: false,
                            }
                        }
                    }))
                }, 200); // 適切な遅延（少し余裕を持たせて）
            };

            // フォーカス復帰を1回だけ検知
            window.addEventListener('focus', handleWindowFocus, { once: false });
        }
    }, [props.articleEditorStatus.controls.image.variable]);


    useEffect(() => {
        if (editor && editor.getHTML() !== articleOnEdit.contents) {
            editor.commands.setContent(articleOnEdit.contents);
        }
    }, [articleOnEdit.contents, editor]);


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
            editor?.chain().focus().toggleBlockquote().run()
        }
    }, [props.articleEditorStatus.decorations.blockQuote.variable])

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
        props.setArticleEditorStatus((prevState) => ({
            ...prevState,
            decorations: {
                ...prevState.decorations,
                blockQuote: {...prevState.decorations.blockQuote, isActive: editor?.isActive('blockquote') as boolean}
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
                if((!!errors && errors.length > 0) || props.articleEditorStatus.controls.link.isActive){
                    return <div className={styles.FadeLayer}></div>
                }
            })()}
            {(() => {
                if(!!errors && errors.length > 0){
                    return <ErrorsCard errors={errors} setErrors={setErrors}/>
                }
            })()}
            {(() => {
                if(props.articleEditorStatus.controls.link.isActive){
                    return <UrlInsertingCard setArticleEditorStatus={props.setArticleEditorStatus} editor={editor as Editor}/>
                }
            })()}
        </div>
    )

}
