/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\ConstantValue.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:28 am
 * Author: Ting
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: constant for frontend
 */


export const SERVER_URL =
	process.env.NODE_ENV === "production"
		? "https://mighty-mesa-33042.herokuapp.com/api/"
		: "http://localhost:5000/api/"
export const LOGIN_INFO_EMPTY_ERROR = "Please fill all fields."
export const LOGIN_MATCH = "match"
