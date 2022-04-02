const express = require("express")
const router = express.Router()
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

module.exports = router
