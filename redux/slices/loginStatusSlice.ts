import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FollowScheme, LikeScheme, LoginStatusScheme, UserProfileScheme, WatchHistoryScheme} from "@/types";
import {produce, WritableDraft} from "immer";
import {isToday} from "@/lib-client/processing";


const initialState: LoginStatusScheme = {
    isLoggedIn: false,
    error: '',
    userProfile: {
        userId: '',
        username: '',
        profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
        introduction: '',
        articleCreatedBy: [],
        likes: [],
        followings: [],
        followers: [],
        watchHistories: [],
        createdAt: '',
    }
}

const LoginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setUserProfile: (state, action: PayloadAction<UserProfileScheme>) => {
            Object.assign(state.userProfile, action.payload)
        },
        setLoginStatus: (state, action: PayloadAction<LoginStatusScheme>) => {
            return action.payload
        },
        resetLoginStatus: (state) => {
            return initialState
        },
        editLikes: (state, action: PayloadAction<{like: LikeScheme, remove: boolean}>) => {
            if(action.payload.remove){
                state.userProfile.likes = state.userProfile.likes.filter(like => like.id !== action.payload.like.id)
            }else {
                if (action.payload.like && !state.userProfile.likes.some(like => like.id === action.payload.like.id)) {
                    state.userProfile.likes.push(action.payload.like as WritableDraft<LikeScheme>);
                }
            }
        },
        editFollowings: (state, action: PayloadAction<{following: FollowScheme, remove: boolean}>) => {
            if(action.payload.remove){
                state.userProfile.followings = state.userProfile.followings.filter(following => following.id !== action.payload.following.id)
                console.log('followings' + state.userProfile.followings);
            }else {
                console.log(action.payload)
                if (action.payload.following && !state.userProfile.followings.some(following => following.id === action.payload.following.id)) {
                    state.userProfile.followings.push(action.payload.following as WritableDraft<FollowScheme>);
                }
            }
        },
        appendWatchHistories: (state, action: PayloadAction<WatchHistoryScheme>) => {
            const previousWatchHistory = state.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId === action.payload.userId && watchHistory.articleId === action.payload.articleId && isToday(watchHistory.createdAt))
            if(previousWatchHistory && previousWatchHistory.length > 0){
                state.userProfile.watchHistories = [...state.userProfile.watchHistories.filter((watchHistory) => watchHistory.userId !== action.payload.userId || watchHistory.articleId !== action.payload.articleId || !isToday(watchHistory.createdAt)), action.payload as WritableDraft<WatchHistoryScheme>]
            }else {
                state.userProfile.watchHistories = [...state.userProfile.watchHistories, action.payload as WritableDraft<WatchHistoryScheme>]
            }
        }
    }
})

export const {setIsLoggedIn, setError, setUserProfile, resetLoginStatus, setLoginStatus, editLikes, editFollowings, appendWatchHistories} = LoginStatusSlice.actions

export const LoginStatusReducer = LoginStatusSlice.reducer

export default LoginStatusSlice
