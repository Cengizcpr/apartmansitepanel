const express = require("express");
const apartmens = express.Router();
const cors = require("cors");
const Apartmen = require("../models/ApartmenModel");

apartmens.use(cors());

apartmens.post("/apartmensetting", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const blocksData = {
    block_name: req.body.block_name,
    circlenumber: req.body.circlenumber,
    car_numbers:"",
    host_state: "Boş",
    host_email: "",
    host_name: "",
    host_surname: "",
    host_phoneno: "",
    date: today,
    style_box: "small-box bg-danger",
  };

  Apartmen.create(blocksData)
    .then((build) => {
      res.json({ status: blocks.block_name + "Registered!" });
      res.json({ message: "false" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
apartmens.put("/apartmensupdate", (req, res) => {
  const blocksData = {
    circlenumber: req.body.circlenumber,
    host_state: req.body.host_state,
    host_name: req.body.host_name,
    host_surname: req.body.host_surname,
    host_phoneno: req.body.host_phoneno,
    style_box: req.body.style_box,
    host_email: req.body.host_email,
    car_numbers:req.body.car_numbers
  };
  Apartmen.update(
    { circlenumber: req.body.title_name },
    blocksData,
    function (err, objs) {}
  )
    .then((apartmen) => {
      res.json({ status: apartmen.circlenumber + "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
//daire adı kontrol
apartmens.post("/findapartmens", (req, res) => {
  Apartmen.findOne({
    circlenumber: req.body.circlenumber,
  }).then((apartmen) => {
    if (!apartmen) {
      res.send("true");
      console.log(apartmen)
    } else {
      res.send("false");
      
    }
  });
});
apartmens.post("/apartmenslist", (req, res) => {
  Apartmen.find({ block_name: req.body.block_name }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({circlenumber:1}) //Alfabeye göre sıralama
    .then((build) => {
      if (build) {
        
        res.json(build)
        
      } 
    })
    .catch((err) => {
  //daire kayıtları bos
    });
});


apartmens.post("/apartmensdelete", (req, res) => {
  Apartmen.remove({ block_name: req.body.block_name })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Apartmen already exists" });
    });
});
module.exports = apartmens;