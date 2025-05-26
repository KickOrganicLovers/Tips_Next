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
    userProfile: UserProfileScheme;
    resetLoginStatus: () => void;
    tryToLogin: (session: SessionContextValue) => void;
    applyUserProfileChanges: (session: SessionContextValue, username: string, introduction: string, profileImageUrl: string) => void;
    postLikeForArticle: (session: SessionContextValue, articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postLikeForComment: (session: SessionContextValue, commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => void;
    postFollowing: (session: SessionContextValue, authorId: string, follow?: FollowScheme, setUserProfile?: Dispatch<SetStateAction<UserProfileScheme>>) => void;
    appendWatchHistories: (session: SessionContextValue, articleId: string) => void;
}

const initialStatus: UserProfileScheme = {
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
}

export const useUserProfileStore = create<StoreConfig>((set, get) => ({
    userProfile: initialStatus,
    resetLoginStatus: () => set({userProfile: initialStatus}),

    tryToLogin: (session: SessionContextValue) => {
        if (!!session) {
            if (session.status === 'authenticated') {
                getDataFromServerWithJson<{userProfile: UserProfileScheme, error: string}>(`/api/login?userId=${session.data.user.id}`).then((json) => {
                    if (!json.error) {
                        set({
                            userProfile: json.userProfile
                        })
                    } else {

                    }
                }).catch((error) => {
                })
            }
        }
    },

    applyUserProfileChanges: (session: SessionContextValue, username: string, introduction: string, profileImageUrl: string) => {
        const current = get().userProfile
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{
                updatedUserProfile: UserProfileScheme,
                error: string
            }>('/api/editUserProfile', {
                userId: current.userId,
                username,
                introduction,
                profileImageUrl
            }).then((json) => {
                if (!json.error) {
                    set((state) => ({
                        userProfile: json.updatedUserProfile
                    }))
                } else {

                }
            }).catch((error) => {

            })
        }
    },

    postLikeForArticle: (session: SessionContextValue, articleId: string, like?: LikeForArticleScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const current = get().userProfile
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{ like?: LikeForArticleScheme, error: string }>('/api/postLike', {
                articleId, userId: current.userId, ...(like !== undefined && {like}), forWhat: 'article'}).then((json) => {
                if (!json.error) {
                    if (!json.like) {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                likesForArticle: state.userProfile.likesForArticle.filter(likeForArticle => likeForArticle.id !== like?.id)
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
                                userProfile: {
                                    ...state.userProfile,
                                    likesForArticle: [
                                        ...state.userProfile.likesForArticle,
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
            })
        }
    },

    postLikeForComment: (session: SessionContextValue, commentId: string, like?: LikeForCommentScheme, setArticle?: Dispatch<SetStateAction<ArticleScheme>>) => {
        const current = get().userProfile
        if(session.status === 'authenticated') {
            postDataToServerWithJson<{like?: LikeForCommentScheme, error?: string}>('/api/postLike', {
                commentId, userId: current.userId, ...(like !== undefined && {like}), forWhat: 'comment'
            }).then((json) => {
                if (!json.error) {
                    if(!json.like) {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                likesForComment: state.userProfile.likesForComment.filter(likeForComment => likeForComment.id !== like?.id)
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
                            userProfile: {
                                ...state.userProfile,
                                likesForComment: [...state.userProfile.likesForComment, json.like as LikeForCommentScheme]
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

                }
            }).catch((error) => {

            })
        }
    },

    postFollowing: (session: SessionContextValue, authorId: string, follow?: FollowScheme, setUserProfile?) => {
        const current = get().userProfile
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{ follow?: FollowScheme, error: string }>('/api/postFollow', {
                following: authorId,
                follower: current.userId, ...(!!follow !== undefined && {follow})
            }).then((json) => {
                if (!json.error) {
                    if (!!json.follow) {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                followings: [...state.userProfile.followings, json.follow as FollowScheme]
                            }
                        }))
                        if (!!setUserProfile) {
                            setUserProfile((prevState) =>
                                ({
                                    ...prevState,
                                    followers: [...prevState.followers, json.follow as FollowScheme]
                                }))
                        }
                    } else {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                followings: state.userProfile.followings.filter((following) => following.id !== follow?.id)
                            }
                        }))
                        if (!!setUserProfile) {
                            setUserProfile((prevState) =>
                                ({
                                    ...prevState,
                                    ...(!!prevState.followers.filter(prevFollow => prevFollow.id !== follow?.id) && {followers: prevState.followers.filter(prevFollow => prevFollow.id !== follow?.id)})
                                }))
                        }
                    }
                }
            }).catch((error) => {

            })
        }
    },

    appendWatchHistories: (session: SessionContextValue, articleId: string) => {
        const current = get().userProfile
        if (session.status === 'authenticated') {
            postDataToServerWithJson<{
                watchHistory: WatchHistoryScheme,
                error: string
            }>('/api/postWatchHistory', {articleId, userId: current.userId}).then((json) => {
                if (!json.error && !!json.watchHistory) {
                    const previousWatchHistory = current.watchHistories.filter((watchHistory) => watchHistory.userId === json.watchHistory.userId && watchHistory.articleId === json.watchHistory.articleId && isToday(watchHistory.createdAt))
                    if (previousWatchHistory && previousWatchHistory.length > 0) {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                watchHistories: [...state.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId !== json.watchHistory.userId || watchHistory.articleId !== json.watchHistory.articleId || !isToday(watchHistory.createdAt)), json.watchHistory as WatchHistoryScheme]
                            }
                        }))
                    } else {
                        set((state) => ({
                            userProfile: {
                                ...state.userProfile,
                                watchHistories: [...state.userProfile.watchHistories, json.watchHistory]
                            }
                        }))
                    }
                }
            })
        }
    },
}))


