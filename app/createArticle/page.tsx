'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import ArticleSettingsSection from "@/app/createArticle/_components/articleSettingsSection/articleSettingsSection";
import styles from './createArticle.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {ArticleScheme, ArticleSchemeWithPrefix, CategoryScheme, UserProfileScheme} from "@/types";
import ErrorsCard from "@/app/createArticle/_components/errorsCard/errorsCard";
import {Article} from "@prisma/client";
import {settings_reset} from "@/redux/slices/articleEditorStatusSlice";

export default function Page() {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus);
    const className = ArticleEditorStatus.settings.variable ? `${styles['div_1']} ${styles['active']}` : styles['div_1'];
    const hasMounted = useRef(true);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [id, setId] = useState<string | undefined>(undefined);
    const [previousContents, setPreviousContents] = useState<string | undefined>(undefined);

    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [thumbnailImageAsBase64, setThumbnailImageAsBase64] = useState<string>('');
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string>('');
    const [category, setCategory] = useState<CategoryScheme | undefined>(undefined);
    const [tags, setTags] = useState<string[]>([]);

    const [errors, setErrors] = useState<string[]>([]);

    const postArticleDataToServer = async () => {
        const article: ArticleSchemeWithPrefix =  {
            id: id,
            previousContents: previousContents,
            title: title,
            contents: contents,
            thumbnailImageAsBase64: thumbnailImageAsBase64,
            categoryId: category?.id as string,
            tags: tags,
            authorId: loginStatus.userProfile.userId
        }
        return await postDataToServerWithJson<{isCreated: boolean, error: string}>('api/uploadArticle', {article});
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
        if(!category){
            errors.push('カテゴリーを選択してください。')
        }
        if(!tags || tags.length === 0){
            errors.push('タグを追加してください。')
        }
        return errors
    }

    useEffect(() => {
        dispatch(settings_reset())
        if(hasMounted.current){
            const articleToEditAsString = sessionStorage.getItem('articleToEdit');
            if (articleToEditAsString) {
                const articleToEdit: ArticleScheme = JSON.parse(articleToEditAsString)
                console.log(articleToEdit)
                setId(articleToEdit.id)
                setTitle(articleToEdit.title)
                setContents(articleToEdit.contents)
                setThumbnailImageUrl(articleToEdit.thumbnailImageUrl)
                setTags(articleToEdit.tags.map(tag => tag.tagName))
                setCategory(articleToEdit.category)
                setPreviousContents(articleToEdit.contents)
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
                <ArticleSettingsSection thumbnailImageUrl={thumbnailImageUrl} setThumbnailImageAsBase64={setThumbnailImageAsBase64} category={category as CategoryScheme} setCategory={setCategory as Dispatch<SetStateAction<CategoryScheme>>}
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
