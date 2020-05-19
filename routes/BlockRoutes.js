const express = require("express");
const blocks = express.Router();
const cors = require("cors");
const Block = require("../models/BlockModel");
const Apartmen = require("../models/ApartmenModel");
const Store = require("../models/StoreModel");

blocks.use(cors());

blocks.post("/blocksetting", (req, res) => {
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
    storenumber: req.body.storenumber,
    date: today
  };

  Block.findOne({
    block_name: req.body.block_name
  })
    .then(blocks => {
      if (!blocks) {
       
      
      
        Block.create(blocksData)
          .then(build => {
            res.json({ status: blocks.block_name + "Registered!" });
            res.json({ message: "false" });
          })
          .catch(err => {
            res.json({ message: "true" });
          });
      
      } else {
        res.json({ error: "Block already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
//blok adı kontrol
blocks.post("/findblock", (req, res) => {
  Block.findOne({
    block_name: req.body.block_name,
  }).then((block) => {
    if (!block) {
      res.send("true");
    } else {
      res.send("false");
    }
  });
});
blocks.put("/blockupdate", (req, res) => {
  const blocksData = {
    block_name: req.body.block_name,
    circlenumber: req.body.circlenumber,
    storenumber: req.body.storenumber
  };
  Block.update({ _id: req.body._id }, blocksData, function(
    err,
    objs
  ) {})
    .then(build => {
      res.json({ status: blocks.block_name + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
});
blocks.get("/blockslist", (req, res) => {
  Block.find({}, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({ block_name: 1 }) //Alfabeye göre sıralama
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
blocks.delete("/blockdelete", (req, res) => {
  Block.remove()
    .then(objs => {
      Apartmen.remove()
      .then(obj=>
        {
          Store.remove()
          .then(obj=>
            {
          res.json(objs);
        })
      })
        
      
    })
    .catch(err => {
      res.json({ error: "Personal already exists" });
    });
});
module.exports = blocks;
