import {create} from "zustand/react";

interface StoreConfig {
    whereIam: string
    applyWhereIam: (whereIam: string) => void
}

const useWhereIamStore = create<StoreConfig>((set, get) => ({
    whereIam: 'root',
    applyWhereIam: (whereIam: string) => {
        set({whereIam})
    }
}))

export default useWhereIamStore;
