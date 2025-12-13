'use client'

import ArticleEditingSection from "@/app/createArticle/_components/articleEditingSection/articleEditingSection";
import styles from './createArticle.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ToolBar from "@/app/createArticle/_components/toolBar/toolBar";
import {useAtom} from "jotai";

import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import { ToolButtonStatusAtom } from "@/lib/lib-client/atoms";

type editorMode = 'toolBar' | 'both'

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const session = useSession()


    const [toolButtonStatus, setToolButtonStatus] = useAtom(ToolButtonStatusAtom)
    useRouter();
    const [editorMode, setEditorMode] = useState<editorMode>('both')

    useEffect(() => {
        if(session.status === 'authenticated'){
            applyWhereIam('createArticle')
        }
    }, []);



    return (
        <div className={styles.div_0}>
            <ToolBar editorMode={editorMode} setEditorMode={setEditorMode} toolButtonStatus={toolButtonStatus}/>
            <ArticleEditingSection editorMode={editorMode}
                                   setEditorMode={setEditorMode}
                                   toolButtonStatus={toolButtonStatus}
                                   setToolButtonStatus={setToolButtonStatus}
            />
        </div>
    )
}
