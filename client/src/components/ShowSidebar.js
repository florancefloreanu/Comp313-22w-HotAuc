/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\ShowSidebar.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, February 28th 2022, 11:18:45 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Show sidebar for child components
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSideBarVisibility } from "../redux/features/layoutSlice"

function ShowSidebar({ children }) {

	const dispatch = useDispatch()
	dispatch(setSideBarVisibility(true))
	return children
}

export default ShowSidebar
