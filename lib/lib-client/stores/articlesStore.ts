import {ArticleScheme} from "@/types";
import {create} from "zustand/react";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface StoreConfig {
    recommendedArticles: ArticleScheme[],
    recommendedArticles_isMax: boolean,
    trendingArticles: ArticleScheme[],
    getRecommendedArticles: ()  => Promise<void>,
    getTrendingArticles: () => Promise<void>,
}

export const useArticlesStore = create<StoreConfig>((set, get) => ({
    recommendedArticles: [],
    recommendedArticles_isMax: false,
    trendingArticles: [],

    getRecommendedArticles: async () => {
        const current = get().recommendedArticles
        const appendError = useErrorStore.getState().appendError
        postDataToServerWithJson<{articles: ArticleScheme[]}>('/api/getArticles/recommendation', {viewingArticleIds: current.map(article => article.id)}).then((json) => {
            if(!!json) {
                set({recommendedArticles: [...current, ...json.articles], recommendedArticles_isMax: json.articles.length < 30});
            }
        }).catch(((error) => {
            appendError(error)
        }))
    },
    getTrendingArticles: async () => {
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
