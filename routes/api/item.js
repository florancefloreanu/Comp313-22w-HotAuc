const express = require("express");
const router = express.Router();
//Middleware
const auth = require("../../middleware/auth");
const AuctionItem = require("../../models/auction_item");

//Get current date
const currentDate = new Date().toJSON().slice(0, 10);

//@route   GET api/item/all
//@desc    Test route
//@access  Public
router.get("/all", async (req, res) => {
  //res.json({message: "Hello item"});
  try {
    //find all the items greater than or equal to the currentDate
    const items = await AuctionItem.find({ endTime: { $gte: currentDate } });
    //const items = await AuctionItem.find({title: /a/ });
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Auction Item search error - all" });
  }
});

//@route   GET api/item/search?title=
//@desc    Test route
//@access  Public
router.get("/search", async (req, res) => {
  //res.json({message: "Hello item"});
  //const { title } = req.body
  var title = req.query.title;
  //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  try {
    //const items = await AuctionItem.find(condition);
    const items = await AuctionItem.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Auction Item search error - search title" });
  }
});

//@route   GET api/item/userid/{id}
//@desc    Test route
//@access  Public
router.get("/userid/:id", async (req, res) => {
  var userId = req.params.id;
  try {
    const items = await AuctionItem.find({ seller: { $in: [userId] } });
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Auction Item search error - items by userid:" + err.message,
    });
  }
});

//@route   GET api/item/bidder/{id}
//@desc    Test route
//@access  Public
router.get("/bidder/:id", async (req, res) => {
  var userId = req.params.id;
  try {
    const items = await AuctionItem.find({ "bids.bidder": { $in: [userId] } });
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg:
        "Auction Item search error - items by bidder (userid):" + err.message,
    });
  }
});

//@route   GET api/item/{id}
//@desc    Test route
//@access  Public
router.get("/:id", async (req, res) => {
  var id = req.params.id;
  try {
    const item = await AuctionItem.findById(id);
    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Auction Item search error - id" });
  }
});

//@route   Post api/item/
//@desc    Test route
//@access  Public
router.post("/", async (req, res) => {
  const item = new AuctionItem(req.body);
  await item
    .save()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//@route   Put api/item/{id}
//@desc    Test route
//@access  Public
router.put("/:id", function (req, res, next) {
  AuctionItem.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//@route   Delete api/item/{id}
//@desc    Test route
//@access  Public
router.delete("/:id", function (req, res, next) {
  AuctionItem.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//@route   Put api/item/{itemId}/user/{userId}
//@access  Public
//Add user to the bidder list of the item
router.put("/:itemId/user/:userId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.params.userId;
    const price = req.body.price;
    const itemInDb = await AuctionItem.findById(itemId);
    var bids = itemInDb.bids;

    console.log(bids);
    const newBid = {
      price: price,
      bidder: userId,
      bidTime: Date.now(),
    };
    bids = [...bids, newBid];

    await AuctionItem.findByIdAndUpdate(itemId, { bids: bids });
    await AuctionItem.findByIdAndUpdate(itemId, { currentPrice: price });
    const result = await AuctionItem.findById(itemId);
    res.json(result);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
