/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\models\user.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: user schema in mongoDB
 */


const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: String
		},
		role: {
			type: String,
			enum: ["user", "admin"]
		}
	},
	{ timestamps: true }
)

const User = mongoose.model("user", UserSchema)

module.exports = User
