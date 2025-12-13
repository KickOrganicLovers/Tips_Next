import {ArticleSchemeWithPrefix, ToolButtonStatusScheme} from "@/types";
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

export const ToolButtonStatusAtom = atom<ToolButtonStatusScheme>({
    decorations:{
        bold: false,
        underline: false,
        italic: false,
        strike: false,
        heading_1: false,
        heading_2: false,
        highlight: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        textAlign_left: false,
        textAlign_center: false,
        textAlign_right: false,
        blockQuote: false,
    },
    controls: {
        image: false,
        link: false,
        settings: false,
        upload: false,
        cancel: false,
    }
})

