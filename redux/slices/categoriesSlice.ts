import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "@/typs";

const initialState: Category[] = []

const CategoriesSlice = createSlice({
    name: 'Categories',
    initialState: initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            return action.payload
        }
    }
})

export const {setCategories} = CategoriesSlice.actions;

export const CategoriesReducer = CategoriesSlice.reducer

export default CategoriesSlice
