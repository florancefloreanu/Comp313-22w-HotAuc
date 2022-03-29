var http = require("http")
const express = require("express")
const app = express()

var server = http.createServer(app)
const connectDB = require("./config/db")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const cors = require("cors")

//Connect MongoDB
connectDB()

//Init middleware
app.use(express.json({ extended: false }))

app.get("/", (req, res) => {
	res.send("API running")
})

//Handle cors

app.use(cors())

//Use Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/item", require("./routes/api/item"))
app.use("/api/admin", require("./routes/api/admin"))

// Chatbot
app.use("/api/dialogflow", require("./routes/api/dialogflow"))

// handle cors error
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	next()
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	console.log(`Port listening on ${PORT}`)
})

