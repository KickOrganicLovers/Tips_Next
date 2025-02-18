import {createSlice} from "@reduxjs/toolkit";
import {Article} from "@prisma/client";

const initialState: Article[] = []


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
