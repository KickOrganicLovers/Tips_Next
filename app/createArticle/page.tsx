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
import {UrlInsertingCard} from "@/app/createArticle/_components/urlInsertingCard/urlInsertingCard";

type editorMode = 'toolBar' | 'both'

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const session = useSession()


    const [articleEditorStatus, setArticleEditorStatus] = useAtom(articleEditorStatusAtom)


    const router = useRouter();
    const [editorMode, setEditorMode] = useState<editorMode>('both')

    useEffect(() => {
        if(session.status === 'authenticated'){
            applyWhereIam('createArticle')
        }
    }, []);



    return (
        <div className={styles.div_0}>
            <ToolBar editorMode={editorMode} setEditorMode={setEditorMode} articleEditorStatus={articleEditorStatus}
                     setArticleEditorStatus={setArticleEditorStatus}/>
            <ArticleEditingSection editorMode={editorMode}
                                   setEditorMode={setEditorMode}
                                   articleEditorStatus={articleEditorStatus}
                                   setArticleEditorStatus={setArticleEditorStatus}
            />
        </div>
    )
}
