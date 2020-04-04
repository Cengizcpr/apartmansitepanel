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
    circlenumber:req.body.circlenumber,
    date: today
  };


        Apartmen.create(blocksData)
          .then(build => {
            res.json({ status: blocks.block_name + "Registered!" });
            res.json({ message: "false" });
          })
          .catch(err => {
            res.json({ message: "true" });
          });
     
  
});
/* blocks.put("/blockupdate", (req, res) => {
  const blocksData = {
    block_name: req.body.block_name,
    circlenumber: req.body.circlenumber,
    storenumber: req.body.storenumber
  };
  Block.update({ block_name: req.body.block_name }, blocksData, function(
    err,
    objs
  ) {})
    .then(build => {
      res.json({ status: blocks.block_name + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
});*/
apartmens.post("/apartmenslist", (req, res) => {
    Apartmen.find({ block_name:req.body.block_name  }, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({}) //Alfabeye göre sıralama
    .then(build => {
      if (build) {
        res.json(build);
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = apartmens;
