'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import ArticleSettingsSection from "@/app/createArticle/_components/articleSettingsSection/articleSettingsSection";
import styles from './createArticle.module.css'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {ArticleScheme, UserProfileScheme} from "@/types";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";

export default function Page() {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus);
    const className = ArticleEditorStatus.settings.variable ? `${styles['div_1']} ${styles['active']}` : styles['div_1'];
    const hasMounted = useRef(true);
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [thumbnailImageAsBase64, setThumbnailImageAsBase64] = useState<string>('');
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>(0);
    const [tags, setTags] = useState<string[]>([]);

    const [errors, setErrors] = useState<string[]>([]);

    const postArticleDataToServer = async () => {
        return await postDataToServerWithJson<{isCreated: boolean, error: string}>('api/uploadArticle', {
            title: title,
            contents: contents,
            thumbnailImageAsBase64: thumbnailImageAsBase64,
            categoryId: categoryId,
            tags: tags,
            authorId: LoginStatus.userProfile.userId
        });
    }

    const checkErrors = () => {
        const errors: string[] = [];
        if(!title){
            errors.push('タイトルを設定してください。')
        }
        if(!contents){
            errors.push('記事が空白です。')
        }
        if(!thumbnailImageAsBase64){
            errors.push('サムネイル画像を選択してください。')
        }
        if(!categoryId){
            errors.push('カテゴリーを選択してください。')
        }
        if(!tags || tags.length === 0){
            errors.push('タグを追加してください。')
        }
        return errors
    }

    useEffect(() => {
        if(hasMounted.current){
            const articleToEditAsString = sessionStorage.getItem('articleToEdit');
            if (articleToEditAsString) {
                const articleToEdit: {article: ArticleScheme, authorProfile: UserProfileScheme} = JSON.parse(articleToEditAsString)
                setTitle(articleToEdit.article.title)
                setContents(articleToEdit.article.contents)
                setThumbnailImageUrl(articleToEdit.article.thumbnailImageUrl)
                setTags(articleToEdit.article.tags)
                setCategoryId(articleToEdit.article.categoryId)
                sessionStorage.removeItem('articleToEdit');
            }
        }
    }, []);


    useEffect(() => {
        if (!hasMounted.current) {
            if(checkErrors().length === 0){
                postArticleDataToServer().then((json) => {
                    console.log(json.error);
                    if (!json.error) {
                        router.push('/')
                    }
                })
            }else {
                setErrors(checkErrors())
            }
        }
    }, [ArticleEditorStatus.upload.variable]);



    useEffect(() => {
        hasMounted.current = false;
    }, []);


    return (
        <div className={styles.div_0}>
            <div className={className}>
                <ArticleEditingSection title={title} setTitle={setTitle} contents={contents} setContents={setContents}/>
                <ArticleSettingsSection setThumbnailImageAsBase64={setThumbnailImageAsBase64} categoryId={categoryId} setCategoryId={setCategoryId}
                                        tags={tags} setTags={setTags}/>
            </div>
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
