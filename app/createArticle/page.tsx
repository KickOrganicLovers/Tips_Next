'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import styles from './createArticle.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ToolBar from "@/app/createArticle/_components/toolBar/toolBar";
import {useAtom} from "jotai";
import {articleEditorStatusAtom} from "@/lib/lib-client/atoms";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";

type editorMode = 'toolBar' | 'both'

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const session = useSession()


    const [articleEditorStatus, setArticleEditorStatus] = useAtom(articleEditorStatusAtom)
    useRouter();
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
