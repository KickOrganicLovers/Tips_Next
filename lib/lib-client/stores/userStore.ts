import {
    ArticleScheme, ArticleSchemeWithPrefix, CommentScheme,
    FollowScheme,
    LikeForArticleScheme, LikeForCommentScheme, UserScheme,
    WatchHistoryScheme
} from "@/types";
import {create} from "zustand/react";
import {SessionContextValue} from "next-auth/react";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {Dispatch, SetStateAction} from "react";
import {isToday} from "@/lib/lib-client/processing";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface StoreConfig {
    user: UserScheme;
    resetLoginStatus: () => void;
    tryToLogin: (session: SessionContextValue) => void;
    applyUserChanges: (session: SessionContextValue, username: string, introduction: string, profileImageUrl: string) => void;
    postComment: (session: SessionContextValue, articleId: string, contents: string, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postLikeForArticle: (session: SessionContextValue, articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postLikeForComment: (session: SessionContextValue, commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postFollowing: (session: SessionContextValue, authorId: string, follow?: FollowScheme, setUser?: Dispatch<SetStateAction<UserScheme>>) => void;
    appendWatchHistories: (session: SessionContextValue, articleId: string) => void;
    uploadArticle: (session: SessionContextValue, article: ArticleSchemeWithPrefix) => void;
}

const initialStatus: UserScheme = {
    id: '',
    name: '',
    image: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
    introduction: '',
    articleCreatedBy: [],
    likesForArticle: [],
    likesForComment: [],
    followings: [],
    followers: [],
    watchHistories: [],
    createdAt: '',
}


export const useUserStore = create<StoreConfig>((set, get) => ({
    user: initialStatus,
    resetLoginStatus: () => set({user: initialStatus}),

    tryToLogin: (session: SessionContextValue) => {
        const appendError = useErrorStore.getState().appendError
        if (!!session) {
            if (session.status === 'authenticated') {
                getDataFromServerWithJson<{user: UserScheme}>(`/api/login`).then((json) => {
                    if (!!json) {
                        set({
                            user: json.user
                        })
                    }
                }).catch((error) => {
                    appendError(error)
                })
            }
        }
    },

    applyUserChanges: (session: SessionContextValue, name: string, introduction: string, image: string) => {
        const appendError = useErrorStore.getState().appendError
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{
                updatedUser: UserScheme,
            }>('/api/editUserProfile', {
                name,
                introduction,
                image
            }).then((json) => {
                if (!!json) {
                    set({
                        user: json.updatedUser
                    })
                }
            }).catch((error) => {
                appendError(error)
            })
        }
    },

    postComment: (session: SessionContextValue, articleId: string, contents: string, setArticle?: Dispatch<SetStateAction<ArticleScheme>> ) => {
        const appendError = useErrorStore.getState().appendError
        if(session.status === 'authenticated') {
            if(!!contents){
                postDataToServerWithJson<{postedComment: CommentScheme}>('/api/postComment', {articleId, contents}).then((json) => {
                    if(!!json){
                        if(!!setArticle){
                            setArticle(prevState => ({
                                ...prevState,
                                comments: [...prevState.comments, json.postedComment]
                            }))
                        }
                    }
                }).catch((error) => {
                    appendError(error)
                })
            }
        }
    },



    postLikeForArticle: (session: SessionContextValue, articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const appendError = useErrorStore.getState().appendError
        const current = get().user
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{ like?: LikeForArticleScheme}>('/api/postLike', {
                articleId, ...(like !== undefined && {like}), forWhat: 'article'}).then((json) => {
                if (!!json) {
                    if (!json.like) {
                        set((state) => ({
                            user: {
                                ...state.user,
                                likesForArticle: state.user.likesForArticle.filter(likeForArticle => likeForArticle.id !== like?.id)
                            }
                        }))
                        if (!!setArticle) {
                            setArticle((prevState) =>
                                ({
                                    ...prevState,
                                    ...(!!prevState.likes.filter(prevLike => prevLike.id !== like?.id) && {likes: prevState.likes.filter(prevLike => prevLike.id !== like?.id)})
                                }))
                        }
                    } else {
                        if (!current.likesForArticle.some(likeForArticle => likeForArticle.id === json.like?.id)) {
                            set((state) => ({
                                user: {
                                    ...state.user,
                                    likesForArticle: [
                                        ...state.user.likesForArticle,
                                        json.like as LikeForArticleScheme
                                    ]
                                }
                            }))
                            if (!!setArticle) {
                                setArticle((prevState) => ({
                                    ...prevState,
                                    likes: !!json.like ? [...prevState.likes, json.like as LikeForArticleScheme] : [...prevState.likes]
                                }))
                            }
                        }
                    }
                }
            }).catch((error) => {
                appendError(error)
            })
        }
    },

    postLikeForComment: (session: SessionContextValue, commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const appendError = useErrorStore.getState().appendError
        if(session.status === 'authenticated') {
            postDataToServerWithJson<{like?: LikeForCommentScheme}>('/api/postLike', {
                commentId, ...(like !== undefined && {like}), forWhat: 'comment'
            }).then((json) => {
                if (!!json) {
                    if(!json.like) {
                        set((state) => ({
                            user: {
                                ...state.user,
                                likesForComment: state.user.likesForComment.filter(likeForComment => likeForComment.id !== like?.id)
                            }
                        }))
                        if(!!setArticle) {
                            setArticle((prevState) => ({
                                ...prevState,
                                comments: prevState.comments.map(comment =>
                                    comment.id === like?.commentId ?
                                        {...comment, likes: comment.likes.filter(likeForComment => likeForComment.id !== like?.id)}
                                        :
                                        comment
                                )
                            }))
                        }
                    }else {
                        set((state) => ({
                            user: {
                                ...state.user,
                                likesForComment: [...state.user.likesForComment, json.like as LikeForCommentScheme]
                            }
                        }))
                        if(!!setArticle){
                            setArticle((prevState) => ({
                                ...prevState,
                                comments: prevState.comments.map(comment =>
                                    comment.id === json.like?.commentId ?
                                        {...comment, likes: [...comment.likes, json.like as LikeForCommentScheme]}
                                        :
                                        comment
                                )
                            }))
                        }
                    }
                }
            }).catch((error) => {
                appendError(error)
            })
        }
    },

    postFollowing: (session: SessionContextValue, authorId: string, follow?: FollowScheme, setUser?) => {
        const appendError = useErrorStore.getState().appendError
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{follow?: FollowScheme}>('/api/postFollow', {
                followingId: authorId,
                ...(!!follow !== undefined && {follow})
            }).then((json) => {
                if (!!json) {
                    if (!!json.follow) {
                        set((state) => ({
                            user: {
                                ...state.user,
                                followings: [...state.user.followings, json.follow as FollowScheme]
                            }
                        }))
                        if (!!setUser) {
                            setUser((prevState) =>
                                ({
                                    ...prevState,
                                    followers: [...prevState.followers, json.follow as FollowScheme]
                                }))
                        }
                    } else {
                        set((state) => ({
                            user: {
                                ...state.user,
                                followings: state.user.followings.filter((following) => following?.id !== follow?.id)
                            }
                        }))
                        if (!!setUser) {
                            setUser((prevState) =>
                                ({
                                    ...prevState,
                                    ...(!!prevState.followers.filter(prevFollow => prevFollow.id !== follow?.id) && {followers: prevState.followers.filter(prevFollow => prevFollow.id !== follow?.id)})
                                }))
                        }
                    }
                }
            }).catch((error) => {
                appendError(error)
            })
        }
    },

    appendWatchHistories: (session: SessionContextValue, articleId: string) => {
        const appendError = useErrorStore.getState().appendError
        const current = get().user
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{
                watchHistory: WatchHistoryScheme,
            }>('/api/postWatchHistory', {articleId}).then((json) => {
                if (!!json) {
                    const previousWatchHistory = current.watchHistories.filter((watchHistory) => watchHistory.userId === json.watchHistory.userId && watchHistory.articleId === json.watchHistory.articleId && isToday(watchHistory.createdAt))
                    if (previousWatchHistory && previousWatchHistory.length > 0) {
                        set((state) => ({
                            user: {
                                ...state.user,
                                watchHistories: [...state.user.watchHistories.filter((watchHistory) => watchHistory.userId !== json.watchHistory.userId || watchHistory.articleId !== json.watchHistory.articleId || !isToday(watchHistory.createdAt)), json.watchHistory as WatchHistoryScheme]
                            }
                        }))
                    } else {
                        set((state) => ({
                            user: {
                                ...state.user,
                                watchHistories: [...state.user.watchHistories, json.watchHistory]
                            }
                        }))
                    }
                }
            }).catch(error => {
                appendError(error)
            })
        }
    },

    uploadArticle(session: SessionContextValue, article: ArticleSchemeWithPrefix ){
        const appendError = useErrorStore.getState().appendError
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{article: ArticleScheme, isNew: boolean}>('/api/uploadArticle', {article}).then(json => {
                if(!!json) {
                    if(!json.isNew){
                        set((state) => ({
                            user: {
                                ...state.user,
                                watchHistories: state.user.watchHistories.map((watchHistory) => {
                                    if(!!watchHistory.article && watchHistory.articleId === json.article.id){
                                        Object.assign(watchHistory.article, json.article)
                                        return watchHistory
                                    }else {
                                        return watchHistory
                                    }
                                })
                            }
                        }))
                    }
                }
            }).catch(error => {
                appendError(error)
            })
        }
    }
}))


