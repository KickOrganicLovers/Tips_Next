import {createSlice} from "@reduxjs/toolkit";

const SideBarStatusSlice = createSlice({
    name: 'SideBarStatus',
    initialState: {
        isActive: false
    },
    reducers: {
        toggle: (state) => {
            state.isActive = !state.isActive
        },
        enable: (state) => {
            state.isActive = true
        },
        disable: (state) => {
            state.isActive = false
        }
    }
})

export const {toggle, enable, disable} = SideBarStatusSlice.actions

export const SideBarStatusReducer = SideBarStatusSlice.reducer

export default SideBarStatusSlice