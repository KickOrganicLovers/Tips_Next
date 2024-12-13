import {createSlice} from "@reduxjs/toolkit";
import {Editor} from "@tiptap/core";

const initialState: {
    bold: {
        isActive: boolean
        variable: boolean
    }
} = {
    bold: {
        isActive: false,
        variable: false
    }
}

const ArticleEditorStatusSlice = createSlice({
    name: 'ArticleEditorStatus',
    initialState,
    reducers: {
        bold_setIsActive: (state, action) => {
            state.bold.isActive = action.payload
        },
        bold_onClick: (state) => {
            state.bold.variable = !state.bold.variable
        }
    }
})

export const {bold_setIsActive, bold_onClick} = ArticleEditorStatusSlice.actions

export const ArticleEditorStatusReducer = ArticleEditorStatusSlice.reducer

export default ArticleEditorStatusSlice