import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryScheme} from "@/types";

const initialState: CategoryScheme[] = []

const CategoriesSlice = createSlice({
    name: 'Categories',
    initialState: initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryScheme[]>) => {
            return action.payload
        }
    }
})

export const {setCategories} = CategoriesSlice.actions;

export const CategoriesReducer = CategoriesSlice.reducer

export default CategoriesSlice
