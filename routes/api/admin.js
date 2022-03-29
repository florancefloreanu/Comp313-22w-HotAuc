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
		const user = await Item.find().select("-password")
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

router.get("/items", async(req, res)=>{
	try{
		const items = await AuctionItem.find({ endTime: { $gte: currentDate } })
	}
	catch (err) {
	console.log(err.message)
	res.status(500).json({ msg: "Auction Item search error - all" })
}
})

router.put("/items/:itemId", async(req, res)=>{
	var itemId = req.params.itemId
	try{
		const item = await AuctionItem.findOneAndUpdate({_id: itemId}, req.body)
		res.json(item)
	}catch (err) {
		console.log(err.message)
		res.status(500).json({msg:"Auction Item search error"})
	}
})

module.exports = router