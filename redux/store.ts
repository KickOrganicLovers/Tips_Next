
import {configureStore} from "@reduxjs/toolkit";
import {WhereIamReducer} from "@/redux/slices/whereIamSlice";
import {LoginStatusReducer} from "@/redux/slices/loginStatusSlice";
import {SideBarStatusReducer} from "@/redux/slices/sideBarStatusSlice";
import {ArticleEditorStatusReducer} from "@/redux/slices/articleEditorStatusSlice";

const store = configureStore({
    reducer: {
        WhereIam: WhereIamReducer,
        LoginStatus: LoginStatusReducer,
        SideBarStatus: SideBarStatusReducer,
        ArticleEditorStatus: ArticleEditorStatusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store