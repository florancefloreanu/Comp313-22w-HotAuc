/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\routes\api\admin.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Tuesday, March 29th 2022, 7:02:01 pm
 * Author: Kenneth
 * 
 * Copyright (c) HotAuc
 * 
 * Purpose: Endpoints for admin
 */


const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
//Middleware
const auth = require("../../middleware/auth")
const User = require("../../models/user")
const Item = require("../../models/auction_item")
const AuctionItem = require("../../models/auction_item")

//@route   GET api/user
//@desc    Test route
//@access  Public
router.get("/users", async (req, res) => {
	try {
		const user = await User.find().select("-password")
		res.json(user)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "User not authenticated" })
	}
})

router.put("/users/:userId", async (req, res) => {
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

router.get("/users/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		res.json(user)
	} catch (err) {
		res.status(500).json({ msg: err.message })
	}
})

router.get("/items", async (req, res) => {
	try {
		var inputDate = Date.now()
		const items = await AuctionItem.find({ endTime: { $lte: inputDate } })
		return res.json(items)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "Auction Item search error - all" })
	}
})

router.get("/items/:itemId", async (req, res) => {
	try {
		const item = await AuctionItem.findById(req.params.itemId)
		res.json(item)
	} catch (err) {
		res.status(500).json({ msg: err.message })
	}
})

router.put("/items/:itemId", async (req, res) => {
	var itemId = req.params.itemId
	try {
		const item = await AuctionItem.findOneAndUpdate({ _id: itemId }, req.body)
		res.json(item)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ msg: "Auction Item search error" })
	}
})

router.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 4 or more characters"
		).isLength({
			min: 4
		})
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password, role } = req.body

		try {
			let user = await User.findOne({ email })
			if (user) {
				return res.status(400).json({ errors: [{ msg: "user already exist" }] })
			}

			user = new User({
				name,
				email,
				role: "admin",
				password
			})

			const salt = await bcrypt.genSalt(10)

			user.password = await bcrypt.hash(password, salt)

			await user.save()

			const payload = {
				user: {
					id: user.id
				}
			}
			try {
				token = await jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: 360000
				})
				const respondUser = {
					_id: user._id,
					email: user.email,
					name: user.name,
					role: user.role
				}

				return res.json({ user: respondUser, token })
			} catch (err) {
				return res.status(500).json({ msg: "Token not generated" })
			}
		} catch (err) {
			return res.status(500).json({ msg: "Server Error" })
		}
	}
)

module.exports = router
