'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import styles from './createArticle.module.css'
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleEditorStatusScheme, ArticleScheme} from "@/types";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";
import ToolBar from "@/app/createArticle/_components/toolBar/toolBar";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";
import {useAtom} from "jotai";
import {articleEditorStatusAtom, articleOnEditAtom} from "@/lib/lib-client/atoms";

type editorMode = 'toolBar' | 'both'

const initialArticleEditorStatus: ArticleEditorStatusScheme = {
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
    image: {
        variable: false,
    },
    settings: {
        variable: false,
    },
    upload: {
        variable: false
    },
    cancel: {
        variable: false
    }
}

export default function Page() {
    const loginStatus = useLoginStatusStore(state => state.loginStatus)
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const [articleOnEdit, setArticleOnEdit] = useAtom(articleOnEditAtom)
    const [articleEditorStatus, setArticleEditorStatus] = useAtom(articleEditorStatusAtom)

    const hasMounted = useRef(true);
    const router = useRouter();

    const [editorMode, setEditorMode] = useState<editorMode>('both')
    const [errors, setErrors] = useState<string[]>([]);

    const postArticleDataToServer = async () => {
        return await postDataToServerWithJson<{
            isCreated: boolean,
            error: string
        }>('api/uploadArticle', {article: articleOnEdit});
    }

    const checkErrors = () => {
        const errors: string[] = [];
        if (!articleOnEdit.title) {
            errors.push('タイトルを設定してください。')
        }
        if (!articleOnEdit.contents) {
            errors.push('記事が空白です。')
        }
        if (!articleOnEdit.thumbnailImageAsBase64) {
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
        if (loginStatus.isLoggedIn) {
            setArticleEditorStatus(initialArticleEditorStatus)
            applyWhereIam('createArticle')
            if (hasMounted.current) {
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
                    sessionStorage.removeItem('articleToEdit');
                }
            }
        } else {
            router.push('/login')
        }
    }, []);

    //toolbarのuploadボタンが押されたときに発火する
    useEffect(() => {
        if (loginStatus.isLoggedIn) {
            setArticleOnEdit((prevState) => ({
                ...prevState,
                authorId: loginStatus.userProfile.userId
            }))
            if (!hasMounted.current) {
                if (checkErrors().length === 0) {
                    postArticleDataToServer().then((json) => {
                        console.log(json.error);
                        if (!json.error) {
                            setArticleOnEdit({
                                title: '',
                                thumbnailImageAsBase64: '',
                                contents: '',
                                tags: [],
                                categoryId: '',
                                authorId: ''
                            })
                            router.push('/')
                        }
                    })
                } else {
                    setErrors(checkErrors())
                }
            }
        }
    }, [articleEditorStatus.upload.variable]);

    useEffect(() => {
        if (!hasMounted.current) {
            setArticleOnEdit({
                title: '',
                thumbnailImageAsBase64: '',
                contents: '',
                tags: [],
                categoryId: '',
                authorId: ''
            })
            router.push('/')
        }
    }, [articleEditorStatus.cancel.variable]);


    useEffect(() => {
        hasMounted.current = false;
    }, []);


    return (
        <div className={styles.div_0}>
            <ToolBar editorMode={editorMode} setEditorMode={setEditorMode} articleEditorStatus={articleEditorStatus}
                     setArticleEditorStatus={setArticleEditorStatus}/>
            <ArticleEditingSection title={articleOnEdit.title} contents={articleOnEdit.contents} editorMode={editorMode}
                                   setEditorMode={setEditorMode} setArticleOnEdit={setArticleOnEdit}
                                   articleEditorStatus={articleEditorStatus}
                                   setArticleEditorStatus={setArticleEditorStatus}/>

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
