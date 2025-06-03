import styles from './optionButton.module.css'
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {MdFileUpload} from "react-icons/md";
import {IoImage} from "react-icons/io5";
import {TbTag} from "react-icons/tb";
import {AiOutlineClose} from "react-icons/ai";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {ArticleEditorStatusScheme} from "@/types";

type editorMode = 'both' | 'toolBar'

interface props {
    buttonOption: 'insertImage' | 'setInfo' | 'upload' | 'cancel'
    editorMode: editorMode
    setArticleEditorStatus: Dispatch<SetStateAction<ArticleEditorStatusScheme>>
}

export default function OptionButton(props: props) {
    const className = `${styles['div_0']} ${styles[props.buttonOption]} ${styles[props.editorMode]}`
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const [isMedia, setIsMedia] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsMedia(true)
            } else {
                setIsMedia(false)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <div className={className}>
            {(() => {
                switch (props.buttonOption) {
                    case 'insertImage':
                        if (isMedia && props.editorMode === 'both') {
                            return (
                                <div className={styles.div_2}><IoImage className={styles.icon} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            image: {variable: !prevState.controls.image.variable}
                                        }
                                    }))
                                }}/></div>
                            )
                        } else {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            image: {variable: !prevState.controls.image.variable}
                                        }
                                    }))
                                }}>画像を挿入</div>
                            )
                        }
                    case 'setInfo':
                        if (isMedia && props.editorMode === 'both') {
                            return (
                                <div className={styles.div_2}><TbTag className={styles.icon} onClick={() => {
                                    setSideBarStatus({isActive: true})
                                }}/></div>
                            )
                        } else if (isMedia && props.editorMode === 'toolBar') {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    setSideBarStatus({isActive: true})
                                }}>公開設定</div>
                            )
                        } else {
                            return undefined
                        }
                    case 'cancel':
                        if (isMedia && props.editorMode === 'both') {
                            return (
                                <div className={styles.div_2}><AiOutlineClose className={styles.icon} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            cancel: {variable: !prevState.controls.cancel.variable}
                                        }
                                    }))
                                }}/></div>
                            )
                        } else {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            cancel: {variable: !prevState.controls.cancel.variable}
                                        }
                                    }))
                                }}>キャンセル</div>
                            )
                        }
                    case 'upload':
                        if (isMedia && props.editorMode === 'both') {
                            return (
                                <div className={styles.div_2}><MdFileUpload className={styles.icon} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            upload: {variable: !prevState.controls.upload.variable}
                                        }
                                    }))
                                }}/></div>
                            )
                        } else {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    props.setArticleEditorStatus((prevState) => ({
                                        ...prevState,
                                        controls: {
                                            ...prevState.controls,
                                            upload: {variable: !prevState.controls.upload.variable}
                                        }
                                    }))
                                }}>記事を投稿</div>
                            )
                        }
                }
            })()}
        </div>
    )
}
