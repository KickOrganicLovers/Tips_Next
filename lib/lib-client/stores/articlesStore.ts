import {ArticleScheme} from "@/types";
import {create} from "zustand/react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";

interface StoreConfig {
    articles: ArticleScheme[],
    getRecommendArticles: () => void,
}

const useArticlesStore = create<StoreConfig>((set, get) => ({
    articles: [],
    getRecommendArticles: () => {
        try {
            getDataFromServerWithJson<{ articles: ArticleScheme[], error: string }>('/api/getArticles').then((json) => {
                if (!json.error) {
                    set({articles: json.articles})
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}))

export default useArticlesStore
