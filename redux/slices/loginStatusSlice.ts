import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginStatusScheme, UserProfileScheme} from "@/typs";


const initialState: {
    isLoggedIn: boolean,
    error: string,
    userProfile: UserProfileScheme
} = {
    isLoggedIn: false,
    error: '',
    userProfile: {
        userId: 0,
        username: '',
        profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
        introduction: ''
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
            state.userProfile = action.payload
        },
        setLoginStatus: (state, action: PayloadAction<LoginStatusScheme>) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.error = action.payload.error
            state.userProfile = action.payload.userProfile
        }
    }
})

export const {setIsLoggedIn, setError, setUserProfile, setLoginStatus} = LoginStatusSlice.actions

export const LoginStatusReducer = LoginStatusSlice.reducer

export default LoginStatusSlice
