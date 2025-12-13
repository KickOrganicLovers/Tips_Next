import {ErrorScheme} from "@/types";
import {create} from "zustand/react";


interface StoreConfig {
    errors: ErrorScheme[]
    appendError: (error: ErrorScheme) => void
    removeError: (index: number) => void
}

export const useErrorStore = create<StoreConfig>((set, get) => ({
    errors: [],
    appendError: (error: ErrorScheme) => {
        const current = get().errors
        set({
            errors: [...current, error],
        })
    },
    removeError: (index: number) => {
        const current = get().errors
        set({
            errors: current.filter((_, i) => i !== index)
        })
    }
}))
