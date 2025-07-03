import {ArticleEditorStatusScheme, ArticleSchemeWithPrefix} from "@/types";
import {atom} from "jotai";

export const articleOnEditAtom = atom<ArticleSchemeWithPrefix>({
    title: '',
    thumbnailImageAsBase64: '',
    contents: '',
    tags: [],
    categoryId: '',
    authorId: ''
})

export const sideBarStatusAtom = atom<{ isActive: boolean }>({
    isActive: false,
})

export const settingsAtom = atom<{isActive: boolean}>({
    isActive: false,
})

export const articleEditorStatusAtom = atom<ArticleEditorStatusScheme>({
    decorations:{
        bold: {
            isActive: false,
            variable: false
        },
        underline: {
            isActive: false,
            variable: false
        },
        italic: {
            isActive: false,
            variable: false
        },
        strike: {
            isActive: false,
            variable: false
        },
        heading_1: {
            isActive: false,
            variable: false
        },
        heading_2: {
            isActive: false,
            variable: false
        },
        highlight: {
            isActive: false,
            variable: false
        },
        codeBlock: {
            isActive: false,
            variable: false
        },
        bulletList: {
            isActive: false,
            variable: false
        },
        orderedList: {
            isActive: false,
            variable: false
        },
        textAlign_left: {
            isActive: false,
            variable: false
        },
        textAlign_center: {
            isActive: false,
            variable: false
        },
        textAlign_right: {
            isActive: false,
            variable: false
        },
        blockQuote: {
            isActive: false,
            variable: false
        },
    },
    controls: {
        image: {
            isActive: false,
            variable: false,
        },
        link: {
            isActive: false,
            variable: false
        },
        settings: {
            variable: false,
        },
        upload: {
            variable: false
        },
        cancel: {
            variable: false
        },
    }
})

