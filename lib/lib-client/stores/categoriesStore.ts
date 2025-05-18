import {create} from "zustand/react";
import {CategoryScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";

interface StoreConfig {
    categories: CategoryScheme[]
    getCategories: () => void;
}

const useCategoriesStore = create<StoreConfig>((set) => ({
    categories: [],
    getCategories: () => {
        getDataFromServerWithJson<{
            categories: CategoryScheme[];
            error: string
        }>('/api/getCategories').then((json) => {
            if (!json.error) {
                set({categories: json.categories})
            } else {
                //write error handling
            }
        }).catch(error => {
            //write error handling
        })
    }
}))

export default useCategoriesStore;
