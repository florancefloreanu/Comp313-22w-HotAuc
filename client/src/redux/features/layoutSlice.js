/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\features\layoutSlice.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, February 28th 2022, 10:12:36 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Save layout related states
 */

import { createSlice } from "@reduxjs/toolkit"

const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		value: {
			sidebar: true
		}
	},
	reducers: {
		setSideBarVisibility: (state, action) => {
			state.value.sidebar = action.payload
		}
	}
})

export const { setSideBarVisibility } = layoutSlice.actions
export default layoutSlice.reducer
