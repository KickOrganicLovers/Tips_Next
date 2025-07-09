import {ArticleScheme} from "@/types";
import {create} from "zustand/react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface StoreConfig {
    recommendedArticles: ArticleScheme[],
    trendingArticles: ArticleScheme[],
    getRecommendedArticles: () => void,
    getTrendingArticles: () => void,
}

export const useArticlesStore = create<StoreConfig>((set, get) => ({
    recommendedArticles: [],
    trendingArticles: [],
    getRecommendedArticles: () => {
        const current = get().recommendedArticles
        const appendError = useErrorStore.getState().appendError
        if(!current || current.length === 0){
            getDataFromServerWithJson<{articles: ArticleScheme[]}>('/api/getArticles').then((json) => {
                if(!!json) {
                    set({recommendedArticles: json.articles});
                }
            }).catch(((error) => {
                appendError(error)
            }))
        }
    },
    getTrendingArticles: () => {
        const current = get().trendingArticles
        const appendError = useErrorStore.getState().appendError
        if(!current || current.length === 0){
            getDataFromServerWithJson<{articles: ArticleScheme[]}>('/api/getArticles/trending').then((json) => {
                if(!!json) {
                    set({trendingArticles: json.articles});
                }
            }).catch(((error) => {
                appendError(error)
            }))
        }
    },
}))
