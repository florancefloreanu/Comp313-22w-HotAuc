const express = require("express");
const router = express.Router();
//Middleware
const auth = require("../../middleware/auth");
const AuctionItem = require("../../models/auction_item");
const User = require("../../models/user");

//Get current date
const currentDate = new Date().toJSON().slice(0, 10);

//Google spell check api key
const spellCheckKey =
  "fc2717188521f90239a5581ff5ade5441d88e65edcfd1ab806b6cd306d9cd9fd";

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

//@route   GET api/item/all/monthly-registered-users
//@desc    Test route
//@access  Public
router.get("/all/monthly-registered-users", async (req, res) => {
  //get current month & Date
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //object to be sent to the frontend
  var monthlyData = {
    //since js date is 0-based we need to add + 1 to get the proper month
    currentMonth: [],
    monthlyRegistrations: [],
  };
  try {
    //for loop to go through each month up until the current month
    for (i = 0; i <= currentMonth; i++) {
      //find the number of items registered monthly
      const items = await User.find({
        createdAt: {
          $gte: new Date(currentYear, "0" + i, 01),
          $lte: new Date(currentYear, "0" + i, 32),
        },
      }).count();
      monthlyData.currentMonth.push(MonthNames[i]);
      //add the items to the property monthly registrations of monthly data object
      monthlyData.monthlyRegistrations.push(items);
    }

    //send the data
    res.json(monthlyData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Search Monthly Registered users - error" });
  }
});

//@route   GET api/item/all/monthly-posted-items
//@desc    Test route
//@access  Public
router.get("/all/monthly-items-posted", async (req, res) => {
  //get current month & Date
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //object to be sent to the frontend
  var monthlyData = {
    //since js date is 0-based we need to add + 1 to get the proper month
    currentMonth: [],
    monthlyItemsPosted: [],
  };
  try {
    //for loop to go through each month up until the current month
    for (i = 0; i <= currentMonth; i++) {
      //find the number of items registered monthly
      const items = await AuctionItem.find({
        createdAt: {
          $gte: new Date(currentYear, "0" + i, 01),
          $lte: new Date(currentYear, "0" + i, 32),
        },
      }).count();
      monthlyData.currentMonth.push(MonthNames[i]);
      //add the items to the property monthly registrations of monthly data object
      monthlyData.monthlyItemsPosted.push(items);
    }

    //send the data
    res.json(monthlyData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Search Monthly Registered users - error" });
  }
});

//@route   GET api/item/all/getbrandcount
//@desc    Test route
//@access  Public
router.get("/all/getbrands&count", async (req, res) => {
  //instantiate an object to pass to charts
  var brandData = { brandList: [], brandCount: [] };

  try {
    //find all the brand names
    const brandNames = await AuctionItem.find().distinct("brand");

    //store all the brand names into the brandlist property of the object
    brandData.brandList = brandNames;

    //for loop to get the count of each brand names store in the database
    for (i = 0; i < brandNames.length; i++) {
      console.log(brandNames[i]);
      const brandNamesCount = await AuctionItem.find({
        brand: { $in: brandNames[i] },
      }).count();
      console.log("Brand: " + brandNames[i] + " Count: " + brandNamesCount);

      //store the count of the specific brand name in the brandcount property of the object that's to be passed.
      brandData.brandCount.push(brandNamesCount);
    }

    //return the object
    res.json(brandData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Auction Item search error - getbrandcount" });
  }
});

//@route   GET api/item/all
//@desc    Test route
//@access  Public
router.post("/all/filter", async (req, res) => {
  const request = req.body;
  const brand = request.brand;
  const year = request.year;
  const sort = request.currentPrice;
  //   const conditions = {
  //     brand: { $in: ["Mazda", "Ford"] },
  //     year: { $in: ["2000", "2001"] },
  //   };

  const conditions = {
    brand,
    year,
    sort,
  };

  checkFilterSizes = () => {
    console.log("body request:", request);
    if (conditions.brand.length == 0 || conditions.brand == "") {
      console.log("brand is empty");
      delete conditions.brand;
      console.log(conditions);
    }
    if (conditions.year.length == 0 || conditions.year == "") {
      console.log("year is empty");
      delete conditions.year;
      console.log(conditions);
    }
    if (conditions.sort.length == 0) {
      console.log("sort is empty");
      delete conditions.sort;
      console.log(conditions);
    }
    console.log("After checking filters: ", conditions);
  };

  try {
    checkFilterSizes();
    const items = await AuctionItem.find(conditions).sort({
      currentPrice: conditions.sort,
    });
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Auction Item search error - Filter" });
  }
});

//@route   GET api/item/search?title=
//@desc    Test route
//@access  Public
router.get("/search", async (req, res) => {
  //res.json({message: "Hello item"});
  //const { title } = req.body
  var title = req.query.title;

  //call spell check

  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch(spellCheckKey);

  let spellCheckResult;
  search.json(
    {
      q: title,
      location: "Canada",
    },
    async (result) => {
      spellCheckResult = result["search_information"];
      let spellFix = null;

      //  If no spell fix
      if (spellCheckResult["spelling_fix"] != null) {
        spellFix = spellCheckResult["spelling_fix"];
        title = spellCheckResult["spelling_fix"];
      }
      //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
      try {
        //const items = await AuctionItem.find(condition);
        const items = await AuctionItem.find({
          title: { $regex: new RegExp(title), $options: "i" },
        });
        const result = {
          spelling_fix: spellFix,
          items: items,
        };
        res.json(result);
      } catch (err) {
        console.log(err.message);
        res
          .status(500)
          .json({ msg: "Auction Item search error - search title" });
      }
    }
  );
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

router.get("/:userId/winning", async (req, res) => {
  try {
    const userId = req.params.userId;
    var inputDate = Date.now();

    const items = await AuctionItem.find({
      $and: [{ "bids.0.bidder": userId }, { endTime: { $lte: inputDate } }],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
