import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginStatusScheme, UserStatusScheme} from "@/typs";

const LoginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: {
        isLoggedIn: false,
        error: '',
        userStatus: {
            id: 0,
            username: '',
            profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
            introduction: ''
        }
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setUserStatus: (state, action: PayloadAction<UserStatusScheme>) => {
            state.userStatus = action.payload
        },
        setLoginStatus: (state, action: PayloadAction<LoginStatusScheme>) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.error = action.payload.error
            state.userStatus = action.payload.userStatus
        }
    }
})

export const {setIsLoggedIn, setError, setUserStatus, setLoginStatus} = LoginStatusSlice.actions

export const LoginStatusReducer = LoginStatusSlice.reducer

export default LoginStatusSlice
