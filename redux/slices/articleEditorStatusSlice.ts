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
    codeBlock: {
        isActive: boolean
        variable: boolean
    }
    bulletList :{
        isActive: boolean
        variable: boolean
    }
    orderedList : {
        isActive: boolean
        variable: boolean
    },
    textAlign_left: {
        isActive: boolean
        variable: boolean
    }
    textAlign_center :{
        isActive: boolean
        variable: boolean
    }
    textAlign_right : {
        isActive: boolean
        variable: boolean
    },

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
    codeBlock: {
        isActive: false,
        variable: false
    },
    bulletList: {
        isActive: false,
        variable: false
    },
    orderedList: {
        isActive: false,
        variable: false
    },
    textAlign_left: {
        isActive: false,
        variable: false
    },
    textAlign_center: {
        isActive: false,
        variable: false
    },
    textAlign_right : {
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
        codeBlock_setIsActive: (state, action) => {
            state.codeBlock.isActive = action.payload
        },
        codeBlock_onClick: (state) => {
            state.codeBlock.variable = !state.codeBlock.variable
        },
        bulletList_setIsActive: (state, action) => {
            state.bulletList.isActive = action.payload
        },
        bulletList_onClick: (state) => {
            state.bulletList.variable = !state.bulletList.variable
        },
        orderedList_setIsActive: (state, action) => {
            state.orderedList.isActive = action.payload
        },
        orderedList_onClick: (state) => {
            state.orderedList.variable = !state.orderedList.variable
        },
        textAlign_left_setIsActive: (state, action) => {
            state.textAlign_left.isActive = action.payload
        },
        textAlign_left_onClick: (state) => {
            state.textAlign_left.variable = !state.textAlign_left.variable
        },
        textAlign_center_setIsActive: (state, action) => {
            state.textAlign_center.isActive = action.payload
        },
        textAlign_center_onClick: (state) => {
            state.textAlign_center.variable = !state.textAlign_center.variable
        },
        textAlign_right_setIsActive: (state, action) => {
            state.textAlign_right.isActive = action.payload
        },
        textAlign_right_onClick: (state) => {
            state.textAlign_right.variable = !state.textAlign_right.variable
        },

    }
})

export const {bold_setIsActive, bold_onClick, underline_setIsActive, underline_onClick, italic_setIsActive, italic_onClick, strike_setIsActive, strike_onClick, heading_1_setIsActive, heading_1_onClick, heading_2_setIsActive, heading_2_onClick, highlight_setIsActive, highlight_onClick, codeBlock_setIsActive, codeBlock_onClick, bulletList_setIsActive, bulletList_onClick, orderedList_setIsActive, orderedList_onClick, textAlign_left_setIsActive, textAlign_left_onClick, textAlign_center_setIsActive, textAlign_center_onClick, textAlign_right_setIsActive, textAlign_right_onClick} = ArticleEditorStatusSlice.actions

export const ArticleEditorStatusReducer = ArticleEditorStatusSlice.reducer

export default ArticleEditorStatusSlice