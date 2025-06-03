'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import styles from './createArticle.module.css'
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleEditorStatusScheme, ArticleScheme, ArticleSchemeWithPrefix} from "@/types";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";
import ToolBar from "@/app/createArticle/_components/toolBar/toolBar";
import {useAtom} from "jotai";
import {articleEditorStatusAtom, articleOnEditAtom} from "@/lib/lib-client/atoms";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useSession} from "next-auth/react";

type editorMode = 'toolBar' | 'both'

const initialArticleEditorDecorations = {
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
}

const initialArticleOnEdit: ArticleSchemeWithPrefix = {
    title: '',
    thumbnailImageAsBase64: '',
    thumbnailImageUrl: '',
    contents: '',
    tags: [],
    categoryId: '',
    authorId: ''
}


export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const [articleOnEdit, setArticleOnEdit] = useAtom(articleOnEditAtom)
    const [articleEditorStatus, setArticleEditorStatus] = useAtom(articleEditorStatusAtom)
    const [previousArticle, setPreviousArticle] = useState<ArticleSchemeWithPrefix>()
    const [hasMounted, setHasMounted] = useState(true)
    const session = useSession()
    const uploadArticle = useUserProfileStore(state => state.uploadArticle)

    const router = useRouter();

    const [editorMode, setEditorMode] = useState<editorMode>('both')
    const [errors, setErrors] = useState<string[]>([]);


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

    useEffect(() => {
        if (session.status ==='authenticated') {
            applyWhereIam('createArticle')
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
        if (!hasMounted && session.status ==='authenticated') {
            if (checkErrors().length === 0) {
                uploadArticle(session, articleOnEdit)
                router.push('/')
                setArticleEditorStatus((prevState) => ({
                    ...prevState,
                    decorations: initialArticleEditorDecorations
                }))
                setArticleOnEdit(initialArticleOnEdit)
            } else {
                setErrors(checkErrors())
            }
        }else {
            setHasMounted(false)
        }
    }, [articleEditorStatus.controls.upload.variable]);

    useEffect(() => {
        if (!hasMounted) {
            router.push('/')
            setArticleEditorStatus((prevState) => ({
                ...prevState,
                decorations: initialArticleEditorDecorations
            }))
            setArticleOnEdit(initialArticleOnEdit)
        }
    }, [articleEditorStatus.controls.cancel.variable]);




    return (
        <div className={styles.div_0}>
            <ToolBar editorMode={editorMode} setEditorMode={setEditorMode} articleEditorStatus={articleEditorStatus}
                     setArticleEditorStatus={setArticleEditorStatus}/>
            <ArticleEditingSection title={articleOnEdit.title} contents={articleOnEdit.contents} editorMode={editorMode}
                                   setEditorMode={setEditorMode} setArticleOnEdit={setArticleOnEdit}
                                   articleEditorStatus={articleEditorStatus}
                                   setArticleEditorStatus={setArticleEditorStatus}
            />

            {(() => {
                if(!!errors && errors.length > 0){
                    return <div className={styles.FadeLayer}></div>
                }
            })()}
            {(() => {
                if(!!errors && errors.length > 0){
                    return <ErrorsCard errors={errors} setErrors={setErrors}/>
                }
            })()}
        </div>
    )
}
