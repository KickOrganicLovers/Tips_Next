import {createSlice} from "@reduxjs/toolkit";
import {ArticleScheme, UserProfileScheme} from "@/typs";

const initialState : {
    article: ArticleScheme,
    authorProfile: UserProfileScheme,
}[] = []


const ArticlesWithAuthorProfileSlice = createSlice({
    name: 'ArticlesWithAuthorProfile',
    initialState,
    reducers: {
        setArticlesWithAuthorProfile: (state, action) => {
            return action.payload
        }
    }
})

export const {setArticlesWithAuthorProfile} = ArticlesWithAuthorProfileSlice.actions
export const ArticlesWithAuthorProfileReducer = ArticlesWithAuthorProfileSlice.reducer

export default ArticlesWithAuthorProfileSlice
