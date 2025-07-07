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

    renderHTML({node, HTMLAttributes}) {
        const { url, title, description, thumbnailImageUrl } = node.attrs
        return [
            'div',
            mergeAttributes(HTMLAttributes, { style: 'width: 100%;height: fit-content;box-sizing: border-box;border-radius: 20px;overflow: hidden;border: 2px solid var(--border-color-1);'}),
            [
                'a',
                {
                    href: url,
                    target: '_blank',
                    style: 'width: 100%;display: flex;flex-direction: row;text-decoration: none;'
                },
                [
                    'div',
                    {
                        style: 'width: 30%;aspect-ratio: 1.91/1;'
                    },
                    ['img', { src: thumbnailImageUrl, alt: 'thumbnail', style: 'width: 100%;height: 100%;object-fit: cover;' }]
                ],
                [
                    'div',
                    { style: 'width: 70%;flex: 1;box-sizing: border-box;padding: 20px;display: flex;flex-direction: column;justify-content: space-around;gap: 20px;' },
                    ['div', { style: 'color: var(--text-color-1);font-size: clamp(1rem, 1vw, 1.4rem);display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-overflow: ellipsis;' }, title],
                    ['div', { style: '    color: var(--text-color-2);font-size: clamp(0.8rem, 0.8vw, 1.2rem);display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;text-overflow: ellipsis;' }, description]
                ]
            ]
        ]
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
