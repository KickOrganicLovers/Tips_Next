import {ArticleScheme} from "@/types";
import {create} from "zustand/react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface StoreConfig {
    articles: ArticleScheme[],
    getRecommendArticles: () => void,
}

export const useArticlesStore = create<StoreConfig>((set, get) => ({
    articles: [],
    getRecommendArticles: () => {
        const appendError = useErrorStore(state => state.appendError)
        getDataFromServerWithJson<{articles: ArticleScheme[]}>('/api/getArticles').then((json) => {
            if (!!json) {
                set({articles: json.articles})
            }
        }).catch((error) => {
            appendError(error)
        })
    }
}))

