/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\middleware\auth.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: hAN
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Authenticate user middleware
 */


const jwt = require("jsonwebtoken")

//Config .env
require("dotenv").config()

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token")

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: "No token" })
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded.user
		next()
	} catch (err) {
		res.status(401).json({ msg: "Token not valid" })
	}
}
