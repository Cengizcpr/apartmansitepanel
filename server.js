var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose");
var port = process.env.PORT || 5000;
var path = require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoURI = "mongodb://localhost:27017/apartmansitepanel";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var User = require("./routes/Admin");
var BuildSetting = require("./routes/BuildRoutes");
var BlockSetting = require("./routes/BlockRoutes");
var PersonalSetting = require("./routes/PersonalRoutes");
var ApartmenSetting = require("./routes/ApartmenRoutes");
var StoreSetting = require("./routes/StoreRoutes");
var CarPark = require("./routes/CarPark");
var FaultSetting = require("./routes/FaultRoutes");
var Message= require("./routes/Message");
var İyzipay= require("./routes/iyzipay");

app.use("/users", User);
app.use("/apartmens", ApartmenSetting);
app.use("/builds", BuildSetting);
app.use("/blocks", BlockSetting);
app.use("/personals", PersonalSetting);
app.use("/stores", StoreSetting);
app.use("/carpark", CarPark);
app.use("/fault", FaultSetting);
app.use("/api",Message)
app.use("/pay",İyzipay);

app.use(express.static(path.join(__dirname, "public")));
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
