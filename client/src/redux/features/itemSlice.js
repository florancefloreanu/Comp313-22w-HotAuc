
/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\features\itemSlice.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: save item related states
 */

import { createSlice } from "@reduxjs/toolkit"

const itemSlice = createSlice({
	name: "item",
	initialState: {
		value: []
	},
	reducers: {
		setSearchResult: (state, action) => {
			state.value = action.payload
		}
	}
})

export const { setSearchResult } = itemSlice.actions
export default itemSlice.reducer
