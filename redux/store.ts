import {configureStore} from "@reduxjs/toolkit";
import {WhereIamReducer} from "@/redux/slices/whereIamSlice";
import {LoginStatusReducer} from "@/redux/slices/loginStatusSlice";
import {SideBarStatusReducer} from "@/redux/slices/sideBarStatusSlice";
import {ArticleEditorStatusReducer} from "@/redux/slices/articleEditorStatusSlice";
import {CategoriesReducer} from "@/redux/slices/categoriesSlice";
import {ArticlesReducer} from "@/redux/slices/articlesSlice";

const store = configureStore({
    reducer: {
        WhereIam: WhereIamReducer,
        LoginStatus: LoginStatusReducer,
        SideBarStatus: SideBarStatusReducer,
        ArticleEditorStatus: ArticleEditorStatusReducer,
        Categories: CategoriesReducer,
        Articles: ArticlesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
