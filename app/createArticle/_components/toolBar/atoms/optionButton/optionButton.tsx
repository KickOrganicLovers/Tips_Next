import styles from './optionButton.module.css'
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {MdFileUpload} from "react-icons/md";
import {IoImage} from "react-icons/io5";
import {TbTag} from "react-icons/tb";
import {AiOutlineClose} from "react-icons/ai";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import { useEventsStore } from '@/lib/lib-client/stores/eventsStore';
import { stat } from 'fs';

type editorMode = 'both' | 'toolBar'

interface props {
    buttonOption: 'setInfo' | 'upload' | 'cancel'
    editorMode: editorMode
}

export default function OptionButton(props: props) {
    const className = `${styles['div_0']} ${styles[props.buttonOption]} ${styles[props.editorMode]}`
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const [isMedia, setIsMedia] = useState<boolean>(false)
    const emit = useEventsStore(state => state.emit)

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
                                    emit('editorEvent', {click: {controls: 'cancel'}})
                                }}/></div>
                            )
                        } else {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    emit('editorEvent', {click: {controls: 'cancel'}})
                                }}>キャンセル</div>
                            )
                        }
                    case 'upload':
                        if (isMedia && props.editorMode === 'both') {
                            return (
                                <div className={styles.div_2}><MdFileUpload className={styles.icon} onClick={() => {
                                    emit('editorEvent', {click: {controls: 'upload'}})
                                }}/></div>
                            )
                        } else {
                            return (
                                <div className={styles.div_1} onClick={() => {
                                    emit('editorEvent', {click: {controls: 'upload'}})
                                }}>記事を投稿</div>
                            )
                        }
                }
            })()}
        </div>
    )
}
