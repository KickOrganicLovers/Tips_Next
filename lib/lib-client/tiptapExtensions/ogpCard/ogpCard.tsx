import {CommandProps, mergeAttributes, Node, RawCommands} from '@tiptap/core'
import {NodeViewWrapper, ReactNodeViewRenderer} from "@tiptap/react";
import styles from './ogpCard.module.css'

interface OgpCardAttrs {
    url: string
    title: string
    description: string
    thumbnailImageUrl: string
}

interface OgpCardCommands{
    insertOgpCard: (attrs: OgpCardAttrs) => boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType = any> {
        ogpCard: {
            insertOgpCard: (attrs: OgpCardAttrs) => ReturnType
        }
    }
}

export const OgpCard = Node.create<OgpCardCommands>({
    name: 'ogpCard',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            url: {default: ''},
            title: {default: ''},
            description: {default: ''},
            thumbnailImageUrl: {default: ''},
        }
    },

    parseHTML() {
        return [{tag: 'div.ogp-card'}]
    },

    renderHTML({HTMLAttributes}) {
        return ['div', mergeAttributes(HTMLAttributes, {class: 'ogp-card'})]
    },

    addNodeView() {
        return ReactNodeViewRenderer(OgpCardComponent)
    },

    addCommands() {
        return {
            insertOgpCard:
                (attrs: OgpCardAttrs) =>
                    ({ commands }: CommandProps) => {
                        return commands.insertContent([
                            { type: 'paragraph' },
                            {type: this.name, attrs,},
                            { type: 'paragraph' },
                        ])
                    },
        }
    },
})

const OgpCardComponent = (props: any) => {
    const {node} = props
    const {url, title, description, thumbnailImageUrl} = node.attrs

    return (
        <NodeViewWrapper as='div' className={styles.div_0}>
            <a href={url} target='_blank' className={styles.a_0}>
                <div className={styles.div_1}>
                    <img src={thumbnailImageUrl} alt={'thumbnail'} className={styles.img_0}/>
                </div>
                <div className={styles.div_2}>
                    <div className={styles.div_3}>{title}</div>
                    <div className={styles.div_4}>{description}</div>
                </div>
            </a>
        </NodeViewWrapper>
    )
}
