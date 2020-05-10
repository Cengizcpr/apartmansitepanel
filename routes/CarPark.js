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
    car_email: req.body.car_email,
    date: today,
  };

  Carpark.findOne({
    locations: req.body.locations,
  }).then((car) => {
    if (!car) {
      Carpark.create(carsData)
        .then((build) => {
          res.send("true");
        })
        .catch((err) => {
          res.send("false");
        });
    } else {
      res.send("err");
    }
  });
});
carparks.post("/carfind", (req, res) => {
  Carpark.find({ car_email: req.body.car_email }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort() //Alfabeye göre sıralama
    .then((build) => {
      if (build) {
        res.json(build);
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
carparks.put("/carupdate", (req, res) => {
  const carsData = {
    car_brand: req.body.car_brand,
    car_color: req.body.car_color,
    car_plate: req.body.car_plate,
    phone_no: req.body.phone_no,
    locations: req.body.locations,
    car_owner: req.body.car_owner,
    car_email: req.body.car_email,
    
  };

  Carpark.update({ locations: req.body.locations }, carsData, function(
    err,
    objs
  ) {})
    .then(build => {
      res.send("true");
    })
    .catch(err => {
      res.send("false");
    });
});
carparks.post("/locationfind", (req, res) => {
  Carpark.findOne({
    locations: req.body.locations,
  }).then((car) => {
    if (car) {
      res.send("true");
    } else {
      res.send("false");
    }
  });
});
carparks.post("/cardelete", (req, res) => {
  Carpark.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "carpark already exists" });
    });
});
module.exports = carparks;
