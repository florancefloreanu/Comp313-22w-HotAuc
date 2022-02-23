const express = require("express");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

const app = express();

//Connect MongoDB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

// // Add headers before the routes are defined
// app.use(function (req, res, next) {
// 	// Website you wish to allow to connect
// 	res.setHeader("Access-Control-Allow-Origin", "*")

// 	// Request methods you wish to allow
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// 	)

// 	// Request headers you wish to allow
// 	res.setHeader("Access-Control-Allow-Headers", "X-Auth-Token")
// 	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader("Access-Control-Allow-Credentials", true)
// 	res.setHeader(" Access-Control-Allow-Headers", "x-auth-token")

// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
// 	)

// 	// Pass to next layer of middleware
// 	next()
// })

//Handle cors

app.use(cors());

//Use Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/item", require("./routes/api/item"));

// Chatbot
app.use("/api/dialogflow", require("./routes/api/dialogflow"));

// handle cors error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
