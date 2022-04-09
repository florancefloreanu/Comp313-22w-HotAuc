/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\features\adminDashboardSlice.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Wednesday, March 30th 2022, 9:03:57 pm
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Save admin dashboard related states
 */

import { createSlice } from "@reduxjs/toolkit"

const adminDashboardSlice = createSlice({
	name: "admin-dashboard",
	initialState: {
		value: { activeComponent: "users" }
	},
	reducers: {
		setActiveComponent: (state, action) => {
			state.value.activeComponent = action.payload
		}
	}
})

export const { setActiveComponent } = adminDashboardSlice.actions
export default adminDashboardSlice.reducer
