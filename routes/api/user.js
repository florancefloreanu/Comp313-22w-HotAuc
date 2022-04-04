/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\routes\api\user.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Monday, January 17th 2022, 9:59:03 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Endpoints for user
 */


const express = require("express")
const router = express.Router()
//Middleware
const auth = require("../../middleware/auth")

const User = require("../../models/user")
const Item = require("../../models/auction_item")

//@route   GET api/user
//@desc    Test route
//@access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await Item.findById(req.user.id).select("-password")
		res.json(user)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "User not authenticated" })
	}
})

//@route   GET api/user
//@desc    Test route
//@access  Public
router.get("/:userId", auth, async (req, res) => {
	var userId = req.params.userId
	try {
		const items = await Item.find({ "bids.bidder": { $in: [userId] } })
		res.json(items)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "User not authenticated" })
	}
})

router.put("/:userId", async (req, res) => {
	var userId = req.params.userId
	try {
		const user = await User.findOneAndUpdate({ _id: userId }, req.body)
		const respond = await User.findById(userId)
		res.json(respond)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "User not authenticated" })
	}
})

//@route   GET api/user/email/:email
//@desc    Test route
//@access  Public
router.get("/email/:email", async (req, res) => {
	var email = req.params.email
	try {
		const user = await User.findOne({ email })
		res.json(user)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "User not authenticated" })
	}
})

module.exports = router
