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
    date: today,
    host_state:"Boş",
    host_name:"",
    host_surname:"",
    host_phoneno:""
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
 apartmens.put("/apartmensupdate", (req, res) => {
  const blocksData = {
    circlenumber: req.body.circlenumber,
    host_state:req.body.host_state,
    host_name:req.body.host_name,
    host_surname:req.body.host_surname,
    host_phoneno:req.body.host_phoneno
    
  };
  Apartmen.update({ circlenumber: req.body.circlenumber }, blocksData, function(
    err,
    objs
  ) {})
    .then(apartmen => {
      res.json({ status: apartmen.circlenumber + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
})
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
