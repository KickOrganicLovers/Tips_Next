import {createSlice} from "@reduxjs/toolkit";

const WhereIamSlice = createSlice({
    name: 'WhereIam',
    initialState: {
        whereIam: 'app'
    },
    reducers: {
        applyWhereIam: (state, action) => {
            state.whereIam = action.payload
        }
    }

})

export const {applyWhereIam} = WhereIamSlice.actions

export const WhereIamReducer = WhereIamSlice.reducer

export default WhereIamSlice