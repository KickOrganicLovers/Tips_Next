import cuid from "cuid";
import { create } from "zustand/react";


type EventMap = {
    editorEvent: {
        click?: {
            decorations?: 'bold'|'underline'|'italic'|'strike'|'heading_1'|'heading_2'|'highlight'|'codeBlock'|'bulletList'|'orderedList'|'textAlign_left'|'textAlign_right'|'textAlign_center'|'blockQuote',
            controls?: 'image'|'link'|'settings'|'upload'|'cancel'
        }
        upload?: boolean
    },
}

type EventState<K extends keyof EventMap> = {
    id: string,
    payload: EventMap[K]
}


interface StoreConfig  {
    events: Partial<{[K in keyof EventMap]: EventState<K>}>,
    emit: <K extends keyof EventMap>(name: K, payload: EventMap[K]) => void;
}


export const useEventsStore = create<StoreConfig>((set) => ({
    events: {},
    emit: (name, payload) => {
        set((state) => ({
            events: {
                ...state.events,
                [name]: { id: cuid(), payload },
            }
        }))
    }
}))

    // decorations:{
    //     bold: {
    //         isActive: false,
    //         variable: false
    //     },
    //     underline: {
    //         isActive: false,
    //         variable: false
    //     },
    //     italic: {
    //         isActive: false,
    //         variable: false
    //     },
    //     strike: {
    //         isActive: false,
    //         variable: false
    //     },
    //     heading_1: {
    //         isActive: false,
    //         variable: false
    //     },
    //     heading_2: {
    //         isActive: false,
    //         variable: false
    //     },
    //     highlight: {
    //         isActive: false,
    //         variable: false
    //     },
    //     codeBlock: {
    //         isActive: false,
    //         variable: false
    //     },
    //     bulletList: {
    //         isActive: false,
    //         variable: false
    //     },
    //     orderedList: {
    //         isActive: false,
    //         variable: false
    //     },
    //     textAlign_left: {
    //         isActive: false,
    //         variable: false
    //     },
    //     textAlign_center: {
    //         isActive: false,
    //         variable: false
    //     },
    //     textAlign_right: {
    //         isActive: false,
    //         variable: false
    //     },
    //     blockQuote: {
    //         isActive: false,
    //         variable: false
    //     },
    // },
    // controls: {
    //     image: {
    //         isActive: false,
    //         variable: false,
    //     },
    //     link: {
    //         isActive: false,
    //         variable: false
    //     },
    //     settings: {
    //         variable: false,
    //     },
    //     upload: {
    //         variable: false
    //     },
    //     cancel: {
    //         variable: false
    //     },
    // }

