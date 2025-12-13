import styles from './toolIcon.module.css'
import {AiOutlineBold, AiOutlineEdit, AiOutlineStrikethrough} from "react-icons/ai";
import {LuAlignCenter, LuAlignLeft, LuAlignRight, LuHeading1, LuHeading2, LuItalic} from "react-icons/lu";
import {MdFormatListNumbered, MdFormatUnderlined, MdOutlineFormatListBulleted} from "react-icons/md";
import {IoCodeSlashOutline, IoImage} from "react-icons/io5";
import classNames from "classnames";
import {Dispatch, SetStateAction, useRef} from "react";
import {BsBlockquoteLeft} from "react-icons/bs";
import {IoIosLink} from "react-icons/io";
import { ToolButtonStatusScheme } from '@/types';
import { useEventsStore } from '@/lib/lib-client/stores/eventsStore';

type editorMode = 'toolBar' | 'both'

interface props {
    editorMode: editorMode
    extension: string
    toolButtonStatus: ToolButtonStatusScheme
}

export default function ToolIcon(props: props) {
    const isInserting = props.extension === 'image' || props.extension === 'link'
    const classname = isInserting? `${styles['div_0']} ${styles[props.editorMode]} ${styles['inserting']} ` : `${styles['div_0']} ${styles[props.editorMode]}`
    const emit = useEventsStore(state => state.emit)

    return (
        <div className={classname}>
            {(() => {
                switch (props.extension) {
                    case 'heading1':
                        return (<div
                            className={props.toolButtonStatus.decorations.heading_1 ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'heading_1'}})
                            }}><LuHeading1 className={styles.icon}/></div>)
                    case 'heading2':
                        return (<div
                            className={props.toolButtonStatus.decorations.heading_2 ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'heading_2'}})
                            }}><LuHeading2 className={styles.icon}/></div>)
                    case 'italic':
                        return (<div
                            className={props.toolButtonStatus.decorations.italic ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'italic'}})
                            }}><LuItalic className={styles.icon}/></div>)
                    case 'underline':
                        return (<div
                            className={props.toolButtonStatus.decorations.underline ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'underline'}})
                            }}><MdFormatUnderlined className={styles.icon}/></div>)
                    case 'bold':
                        return (<div
                            className={props.toolButtonStatus.decorations.bold ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'bold'}})
                            }}><AiOutlineBold className={styles.icon}/></div>)
                    case 'strikeThrough':
                        return (<div
                            className={props.toolButtonStatus.decorations.strike ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'strike'}})
                            }}><AiOutlineStrikethrough className={styles.icon}/></div>)
                    case 'alignLeft':
                        return (<div
                            className={props.toolButtonStatus.decorations.textAlign_left ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'textAlign_left'}})
                            }}><LuAlignLeft className={styles.icon}/></div>)
                    case 'alignRight':
                        return (<div
                            className={props.toolButtonStatus.decorations.textAlign_right ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'textAlign_right'}})
                            }}><LuAlignRight className={styles.icon}/></div>)
                    case 'alignCenter':
                        return (<div
                            className={props.toolButtonStatus.decorations.textAlign_center ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'textAlign_center'}})
                            }}><LuAlignCenter className={styles.icon}/></div>)
                    case 'orderedList':
                        return (<div
                            className={props.toolButtonStatus.decorations.orderedList ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'orderedList'}})
                            }}><MdFormatListNumbered className={styles.icon}/></div>)
                    case 'bulletList':
                        return (<div
                            className={props.toolButtonStatus.decorations.bulletList ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'bulletList'}})
                            }}><MdOutlineFormatListBulleted className={styles.icon}/></div>)
                    case 'codeBlock':
                        return (<div
                            className={props.toolButtonStatus.decorations.codeBlock ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'codeBlock'}})
                            }}><IoCodeSlashOutline className={styles.icon}/></div>)
                    case 'highlight':
                        return (<div
                            className={props.toolButtonStatus.decorations.highlight ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'highlight'}})
                            }}><AiOutlineEdit className={styles.icon}/></div>)
                    case 'blockQuote':
                        return (<div
                            className={props.toolButtonStatus.decorations.blockQuote ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {decorations: 'blockQuote'}})
                            }}><BsBlockquoteLeft className={styles.icon}/></div>)
                    case 'link':
                        return (<div
                            className={props.toolButtonStatus.controls.link ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {controls: 'link'}})
                            }}><IoIosLink className={styles.icon}/></div>)
                    case 'image':
                        return (<div
                            className={props.toolButtonStatus.controls.image ? classNames(styles.div_3, styles.active) : styles.div_3}
                            onClick={() => {
                                emit('editorEvent', {click: {controls: 'image'}})
                            }}><IoImage className={styles.icon}/></div>)
                }
            })()}
            <div className={styles.div_2}>
                {(() => {
                    switch (props.extension) {
                        case 'heading1':
                            return <div className={styles.div_1}>表題1</div>
                        case 'heading2':
                            return <div className={styles.div_1}>表題2</div>
                        case 'italic':
                            return <div className={styles.div_1}>斜体</div>
                        case 'underline':
                            return <div className={styles.div_1}>下線</div>
                        case 'bold':
                            return <div className={styles.div_1}>太字</div>
                        case 'strikeThrough':
                            return <div className={styles.div_1}>横線</div>
                        case 'alignLeft':
                            return <div className={styles.div_1}>左揃え</div>
                        case 'alignRight':
                            return <div className={styles.div_1}>右揃え</div>
                        case 'alignCenter':
                            return <div className={styles.div_1}>中央揃え</div>
                        case 'orderedList':
                            return <div className={styles.div_1}>順序</div>
                        case 'bulletList':
                            return <div className={styles.div_1}>黒点</div>
                        case 'highlight':
                            return <div className={styles.div_1}>マーク</div>
                        case 'codeBlock':
                            return <div className={styles.div_1}>コード</div>
                        case 'blockQuote':
                            return <div className={styles.div_1}>段落</div>
                        case 'link':
                            return <div className={styles.div_1}>リンク</div>
                        case 'image':
                            return <div className={styles.div_1}>画像</div>
                    }
                })()}
            </div>
        </div>
    )

}
