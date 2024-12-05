
import {configureStore} from "@reduxjs/toolkit";
import {WhereIamReducer} from "@/redux/whereIamSlice";
import {LoginStatusReducer} from "@/redux/loginStatusSlice";
import {SideBarStatusReducer} from "@/redux/sideBarStatusSlice";

const store = configureStore({
    reducer: {
        WhereIam: WhereIamReducer,
        LoginStatus: LoginStatusReducer,
        SideBarStatus: SideBarStatusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store