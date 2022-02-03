// module imports
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");


// file import
const logger = require("./config/logger");


// load env variables
require("dotenv").config();

// define app from express
const app = express();

// set vars for app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// using
app.use("/assets", express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));

// adding Helmet to enhance your API's security
app.use(helmet());

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "log"),
  });
  
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));


// routes file definition
const router = express.Router();
const routes = require("./routes")(router, {});
app.use("/", routes);


app.listen(process.env.PORT, function () {
    console.log(`Server is listening on port ${process.env.PORT}`)
})