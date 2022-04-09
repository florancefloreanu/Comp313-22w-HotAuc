/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\LocalUser.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Sunday, February 27th 2022, 8:51:31 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Load user from local storage
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setlocalUser } from "../redux/features/userInforSlice"

export const LocalUser = ({ children }) => {
	const dispatch = useDispatch()
	const localEmail = localStorage.getItem("email")
	const localToken = localStorage.getItem("token")
	const localId = localStorage.getItem("_id")
	const localName = localStorage.getItem("name")
	const localRole = localStorage.getItem("role")
	const reduxEmail = useSelector((state) => state.userInfor.user?.email)

	if (reduxEmail == null && localEmail != null) {
		const payload = {
			user: {
				email: localEmail,
				_id: localId,
				name: localName,
				role: localRole
			},
			token: localToken
		}
		dispatch(setlocalUser(payload))
	}

	return children
}
