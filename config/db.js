const mongoose = require("mongoose")


//Config .env
require("dotenv").config()


const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true
		})

		console.log("MongoDB Connected")
	} catch (err) {
		console.log(err.message)
		process.exit(1)
	}
}

module.exports = connectDB
