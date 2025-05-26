import {create} from "zustand/react";

interface StoreConfig {
    whereIam: string
    applyWhereIam: (whereIam: string) => void
}

export const useWhereIamStore = create<StoreConfig>((set, get) => ({
    whereIam: 'root',
    applyWhereIam: (whereIam: string) => {
        set({whereIam})
    }
}))

