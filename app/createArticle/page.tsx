'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import ArticleSettingsSection from "@/app/createArticle/_components/articleSettingsSection/articleSettingsSection";
import styles from './createArticle.module.css'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/app/lib-client/fetch";
import {ArticleScheme} from "@/typs";

export default function Page() {
    const ArticleEditorStatus = useSelector<RootState, RootState['ArticleEditorStatus']>((state) => state.ArticleEditorStatus)
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus);
    const className = ArticleEditorStatus.settings.variable ? `${styles['div_1']} ${styles['active']}` : styles['div_1'];
    const hasMounted = useRef(true);
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [thumbnailImageAsBase64, setThumbnailImageAsBase64] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>(0);
    const [tags, setTags] = useState<string[]>([]);

    const postArticleDataToServer = async () => {
        return await postDataToServerWithJson<{isCreated: boolean, error: string}>('api/uploadArticle', {
            title: title,
            contents: contents,
            thumbnailImageAsBase64: thumbnailImageAsBase64,
            categoryId: categoryId,
            tags: tags,
            authorId: LoginStatus.userProfile.userId
        });
        // const url = 'api/uploadArticle'
        // const params = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         title: title,
        //         contents: contents,
        //         thumbnailAsBase64: thumbnailAsBase64,
        //         categoryId: categoryId,
        //         tags: tags,
        //     })
        // }
        // return await fetch(url, params)
    }


    useEffect(() => {
        if (!hasMounted.current) {
            postArticleDataToServer().then((json) => {
                console.log(json.error);
                if (!json.error) {
                    router.push('/')
                }
            })
        }
    }, [ArticleEditorStatus.upload.variable]);

    useEffect(() => {
        hasMounted.current = false;
    }, []);


    return (
        <div className={styles.div_0}>
            <div className={className}>
                <ArticleEditingSection title={title} setTitle={setTitle} setContents={setContents}/>
                <ArticleSettingsSection setThumbnailImageAsBase64={setThumbnailImageAsBase64} setCategoryId={setCategoryId}
                                        tags={tags} setTags={setTags}/>
            </div>
        </div>
    )
}
