import {create} from "zustand/react";
import {CategoryScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";

interface StoreConfig {
    categories: CategoryScheme[]
    getCategories: () => void;
}

export const useCategoriesStore = create<StoreConfig>((set) => ({
    categories: [],
    getCategories: () => {
        getDataFromServerWithJson<{
            categories: CategoryScheme[];
        }>('/api/getCategories').then((json) => {
            if (!!json) {
                set({categories: json.categories})
            }
        }).catch(error => {
            //write error handling
        })
    }
}))

