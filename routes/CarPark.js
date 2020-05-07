const express = require("express");
const carparks = express.Router();
const cors = require("cors");
const Carpark = require("../models/CarparkModel");

carparks.use(cors());
carparks.post("/carregister", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const carsData = {
    car_brand: req.body.car_brand,
    car_color: req.body.car_color,
    car_plate: req.body.car_plate,
    phone_no: req.body.phone_no,
    locations: req.body.locations,
    car_owner: req.body.car_owner,

    date: today,
  };

  Carpark.create(carsData)
    .then((build) => {
      res.send("true");
    })
    .catch((err) => {
      res.send("false");
    });
});
module.exports = carparks;
