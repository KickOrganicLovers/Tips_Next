import {createSlice} from "@reduxjs/toolkit";
import {ArticleScheme, UserProfileScheme} from "@/types";

const initialState : ArticleScheme[] = []


const ArticlesSlice = createSlice({
    name: 'Articles',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            return action.payload
        }
    }
})

export const {setArticles} = ArticlesSlice.actions
export const ArticlesReducer = ArticlesSlice.reducer

export default ArticlesSlice
