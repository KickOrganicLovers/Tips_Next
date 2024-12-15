import {createSlice} from "@reduxjs/toolkit";
import {Editor} from "@tiptap/core";

const initialState: {
    bold: {
        isActive: boolean
        variable: boolean
    }
    underline: {
        isActive: boolean
        variable: boolean
    }
    italic: {
        isActive: boolean
        variable: boolean
    }
    strike: {
        isActive: boolean
        variable: boolean
    }
    heading_1: {
        isActive: boolean
        variable: boolean
    }
    heading_2: {
        isActive: boolean
        variable: boolean
    }
    highlight: {
        isActive: boolean
        variable: boolean
    }
    code: {
        isActive: boolean
        variable: boolean
    }
} = {
    bold: {
        isActive: false,
        variable: false
    },
    underline: {
        isActive: false,
        variable: false
    },
    italic: {
        isActive: false,
        variable: false
    },
    strike: {
        isActive: false,
        variable: false
    },
    heading_1: {
        isActive: false,
        variable: false
    },
    heading_2: {
        isActive: false,
        variable: false
    },
    highlight: {
        isActive: false,
        variable: false
    },
    code: {
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
        },
        underline_setIsActive: (state, action) => {
            state.underline.isActive = action.payload
        },
        underline_onClick: (state) => {
            state.underline.variable = !state.underline.variable
        },
        italic_setIsActive: (state, action) => {
            state.italic.isActive = action.payload
        },
        italic_onClick: (state) => {
            state.italic.variable = !state.italic.variable
        },
        strike_setIsActive: (state, action) => {
            state.strike.isActive = action.payload
        },
        strike_onClick: (state) => {
            state.strike.variable = !state.strike.variable
        },
        heading_1_setIsActive: (state, action) => {
            state.heading_1.isActive = action.payload
        },
        heading_1_onClick: (state) => {
            state.heading_1.variable = !state.heading_1.variable
        },
        heading_2_setIsActive: (state, action) => {
            state.heading_2.isActive = action.payload
        },
        heading_2_onClick: (state) => {
            state.heading_2.variable = !state.heading_2.variable
        },
        highlight_setIsActive: (state, action) => {
            state.highlight.isActive = action.payload
        },
        highlight_onClick: (state) => {
            state.highlight.variable = !state.highlight.variable
        },
        code_setIsActive: (state, action) => {
            state.code.isActive = action.payload
        },
        code_onClick: (state) => {
            state.code.variable = !state.code.variable
        },

    }
})

export const {bold_setIsActive, bold_onClick, underline_setIsActive, underline_onClick, italic_setIsActive, italic_onClick, strike_setIsActive, strike_onClick, heading_1_setIsActive, heading_1_onClick, heading_2_setIsActive, heading_2_onClick, highlight_setIsActive, highlight_onClick, code_setIsActive, code_onClick} = ArticleEditorStatusSlice.actions

export const ArticleEditorStatusReducer = ArticleEditorStatusSlice.reducer

export default ArticleEditorStatusSlice