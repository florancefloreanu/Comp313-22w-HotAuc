/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\models\auction_item.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Wednesday, February 23rd 2022, 10:05:41 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Auction item schema in mongoDB
 */

const mongoose = require("mongoose")

const AuctionItemSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		description: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: true
		},
		year: {
			type: String,
			required: true,
			default: "2000"
		},

		endTime: {
			type: Date,
			required: true
		},
		startingPrice: {
			type: Number,
			required: true
		},
		currentPrice: {
			type: Number,
			required: true
		},
		images: [
			{
				uri: {
					type: String
				}
			}
		],
		isPaid: {
			type: Boolean,
			default:false
		},
		bids: [
			{
				price: {
					type: Number
				},
				bidder: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "user"
				},
				bidTime: {
					type: Date
				}
			}
		],
		winner: {
			price: {
				type: Number
			},
			bidder: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user"
			},
			bidTime: {
				type: Date
			}
		}
	},
	{ timestamps: true }
)

const AuctionItem = mongoose.model("auction-item", AuctionItemSchema)

module.exports = AuctionItem
