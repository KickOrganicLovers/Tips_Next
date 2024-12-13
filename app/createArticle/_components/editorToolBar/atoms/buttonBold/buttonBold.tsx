'use client'


import {Editor} from "@tiptap/core";
import styles from './buttonBold.module.css'
import {useRef} from "react";

interface props {
    editor: Editor | null
}

export default function ButtonBold(props: props) {
    const isBoldActive = props.editor?.isActive('bold')
    const className = isBoldActive? `${styles['button']} ${styles['active']}` : `${styles['button']}`;


    const clickEventHandler = () => {
        props.editor?.chain().focus().toggleBold().run()
    }

    return(
        <button onClick={clickEventHandler} className={className}>
            B
        </button>
    )
}