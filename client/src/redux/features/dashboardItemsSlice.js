/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\features\dashboardItemsSlice.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: save user dashboard states
 */


import { createSlice } from "@reduxjs/toolkit"


const dashbordItemslice = createSlice({
	name: "dashbordUserItem",
	initialState: {
		value: [],
        errors:[]
	},
	reducers: {
		setSearchResult: (state, action) => {
			state.value = action.payload.data
		},

        setResultError: (state, action) =>{
            state.errors.push(action.payload)
        }
	}
})


export const { setSearchResult, setResultError } = dashbordItemslice.actions
export default dashbordItemslice.reducer