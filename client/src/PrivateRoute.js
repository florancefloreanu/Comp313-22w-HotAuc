/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\PrivateRoute.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, February 28th 2022, 9:21:15 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Deny access from unlogged users
 */


import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {


	const reduxEmail = useSelector((state) => state.userInfor.user?.email)
	if (reduxEmail != null) {
		return children
	}

	return <Navigate to="/login" />
}
