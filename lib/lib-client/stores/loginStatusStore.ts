import {
    ArticleScheme, CommentScheme,
    FollowScheme,
    LikeForArticleScheme, LikeForCommentScheme,
    LoginStatusScheme,
    UserProfileScheme,
    WatchHistoryScheme
} from "@/types";
import {create} from "zustand/react";
import {SessionContextValue} from "next-auth/react";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {Dispatch, SetStateAction} from "react";
import {isToday} from "@/lib/lib-client/processing";

interface StoreConfig {
    loginStatus: LoginStatusScheme;
    resetLoginStatus: () => void;
    tryToLogin: (session: SessionContextValue) => void;
    applyUserProfileChanges: (username: string, introduction: string, profileImageUrl: string) => void;
    postLikeForArticle: (articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postLikeForComment: (commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postFollowing: (authorId: string, follow?: FollowScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    appendWatchHistories: (articleId: string) => void;
}

const initialStatus: LoginStatusScheme = {
    isLoggedIn: false,
    error: '',
    userProfile: {
        userId: '',
        username: '',
        profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
        introduction: '',
        articleCreatedBy: [],
        likesForArticle: [],
        likesForComment: [],
        followings: [],
        followers: [],
        watchHistories: [],
        createdAt: '',
    },
}
const useLoginStatusStore = create<StoreConfig>((set, get) => ({

    loginStatus: initialStatus,

    resetLoginStatus: () => set({loginStatus: initialStatus}),

    tryToLogin: (session: SessionContextValue) => {
        if (!!session) {
            if (session.status === 'authenticated') {
                getDataFromServerWithJson<LoginStatusScheme>(`/api/login?userId=${session.data.user.id}`).then((json) => {
                    if (!json.error) {
                        set({
                            loginStatus: json
                        })
                    } else {
                        console.error(json.error)
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                error: json.error
                            }
                        }))
                    }
                }).catch((error) => {
                    set((state) => ({
                        loginStatus: {
                            ...state.loginStatus,
                            error: error as string,
                        }
                    }))
                })
            }
        }
    },

    applyUserProfileChanges: (username, introduction, profileImageUrl) => {
        const current = get().loginStatus
        if (current.isLoggedIn) {
            postDataToServerWithJson<{
                updatedUserProfile: UserProfileScheme,
                error: string
            }>('/api/editUserProfile', {
                userId: current.userProfile.userId,
                username,
                introduction,
                profileImageUrl
            }).then((json) => {
                if (!json.error) {
                    set((state) => ({
                        loginStatus: {
                            ...state.loginStatus,
                            userProfile: json.updatedUserProfile
                        }
                    }))
                } else {
                    set((state) => ({
                        loginStatus: {
                            ...state.loginStatus,
                            error: json.error
                        }
                    }))
                }
            }).catch((error) => {
                set((state) => ({
                    loginStatus: {
                        ...state.loginStatus,
                        error: error as string,
                    }
                }))
            })

        }
    },

    postLikeForArticle: (articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const current = get().loginStatus
        if (current.isLoggedIn) {
            postDataToServerWithJson<{ like?: LikeForArticleScheme, error: string }>('/api/postLike', {
                articleId, userId: current.userProfile.userId, ...(like !== undefined && {like}), forWhat: 'article'}).then((json) => {
                if (!json.error) {
                    if (!json.like) {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    likesForArticle: state.loginStatus.userProfile.likesForArticle.filter(likeForArticle => likeForArticle.id !== like?.id)
                                }
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
                        if (!current.userProfile.likesForArticle.some(likeForArticle => likeForArticle.id === json.like?.id)) {
                            set((state) => ({
                                loginStatus: {
                                    ...state.loginStatus,
                                    userProfile: {
                                        ...state.loginStatus.userProfile,
                                        likesForArticle: [
                                            ...state.loginStatus.userProfile.likesForArticle,
                                            json.like as LikeForArticleScheme
                                        ]
                                    }
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
                set((state) => ({
                    loginStatus: {
                        ...state.loginStatus,
                        error: error as string,
                    }
                }))
            })
        }
    },

    postLikeForComment: (commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const current = get().loginStatus
        if(current.isLoggedIn) {
            postDataToServerWithJson<{like?: LikeForCommentScheme, error?: string}>('/api/postLike', {
                commentId, userId: current.userProfile.userId, ...(like !== undefined && {like}), forWhat: 'comment'
            }).then((json) => {
                if (!json.error) {
                    if(!json.like) {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    likesForComment: state.loginStatus.userProfile.likesForComment.filter(likeForComment => likeForComment.id !== like?.id)
                                }
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
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    likesForComment: [...state.loginStatus.userProfile.likesForComment, json.like as LikeForCommentScheme]
                                }
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
                }else {
                    set((state) => ({
                        loginStatus: {
                            ...state.loginStatus,
                            error: json.error as string,
                        }
                    }))
                }
            }).catch((error) => {
                set((state) => ({
                    loginStatus: {
                        ...state.loginStatus,
                        error: error as string,
                    }
                }))
            })
        }
    },

    postFollowing: (authorId: string, follow?: FollowScheme, setArticle?) => {
        const current = get().loginStatus
        if (current.isLoggedIn) {
            postDataToServerWithJson<{ follow?: FollowScheme, error: string }>('/api/postFollow', {
                following: authorId,
                follower: current.userProfile.userId, ...(!!follow !== undefined && {follow})
            }).then((json) => {
                if (!json.error) {
                    if (!!json.follow) {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    followings: [...state.loginStatus.userProfile.followings, json.follow as FollowScheme]
                                }
                            }
                        }))
                        if (!!setArticle) {
                            setArticle((prevState) =>
                                ({
                                    ...prevState,
                                    authorProfile: {
                                        ...prevState.authorProfile,
                                        followers: [...prevState.authorProfile.followers, json.follow as FollowScheme]
                                    }
                                }))
                        }
                    } else {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    followings: state.loginStatus.userProfile.followings.filter((following) => following.id !== follow?.id)
                                }
                            }
                        }))
                        if (!!setArticle) {
                            setArticle((prevState) =>
                                ({
                                    ...prevState,
                                    authorProfile: {
                                        ...prevState.authorProfile,
                                        ...(!!prevState.authorProfile.followers.filter(prevFollow => prevFollow.id !== follow?.id) && {followers: prevState.authorProfile.followers.filter(prevFollow => prevFollow.id !== follow?.id)})
                                    }
                                }))
                        }
                    }
                }
            }).catch((error) => {
                set((state) => ({
                    loginStatus: {
                        ...state.loginStatus,
                        error: error as string,
                    }
                }))
            })
        }
    },

    appendWatchHistories: (articleId: string) => {
        const current = get().loginStatus
        if (current.isLoggedIn) {
            postDataToServerWithJson<{
                watchHistory: WatchHistoryScheme,
                error: string
            }>('/api/postWatchHistory', {articleId, userId: current.userProfile.userId}).then((json) => {
                if (!json.error && !!json.watchHistory) {
                    const previousWatchHistory = current.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId === json.watchHistory.userId && watchHistory.articleId === json.watchHistory.articleId && isToday(watchHistory.createdAt))
                    if (previousWatchHistory && previousWatchHistory.length > 0) {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    watchHistories: [...state.loginStatus.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId !== json.watchHistory.userId || watchHistory.articleId !== json.watchHistory.articleId || !isToday(watchHistory.createdAt)), json.watchHistory as WatchHistoryScheme]
                                }
                            }
                        }))
                    } else {
                        set((state) => ({
                            loginStatus: {
                                ...state.loginStatus,
                                userProfile: {
                                    ...state.loginStatus.userProfile,
                                    watchHistories: [...state.loginStatus.userProfile.watchHistories, json.watchHistory]
                                }
                            }
                        }))
                    }
                }
            })
        }
    },
}))


export default useLoginStatusStore;
