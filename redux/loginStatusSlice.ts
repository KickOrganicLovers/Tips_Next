import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginStatusScheme, UserStatusScheme} from "@/typs";

const LoginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: {
        isLoggedIn: false,
        errorMessage: '',
        userStatus: {
            userNumber: 0,
            userName: '',
            profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
            introduction: ''
        }
    },
    reducers :{
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
        setUserStatus: (state, action: PayloadAction<UserStatusScheme>) => {
            state.userStatus = action.payload
        }
    }
})

export const {setIsLoggedIn, setErrorMessage, setUserStatus} = LoginStatusSlice.actions

export const LoginStatusReducer = LoginStatusSlice.reducer

export default LoginStatusSlice