const express = require("express");
const builds = express.Router();
const cors = require("cors");
const Build = require("../models/BuildModel");
const jwt = require("jsonwebtoken");
const Block = require("../models/BlockModel");

builds.use(cors());

builds.post("/buildsetting", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const buildsData = {
    build_name: req.body.build_name,
    phone_no: req.body.phone_no,
    adress: req.body.adress,
    blocknumbers: req.body.blocknumbers,
    date: today
  };

  Build.findOne({
    build_name: req.body.build_name
  })
    .then(build => {
      if (!build) {
 
        Build.create(buildsData)
          .then(build => {
            res.json({ status: builds.build_name + "Registered!" });
            res.json({ message: "false" });
          })
          .catch(err => {
            res.json({ message: "true" });
          });
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
builds.get("/buildslist", (req, res) => {
  Build.find({}, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
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
builds.put("/buildsupdate", (req, res) => {
  const blocksData = {
    build_name: req.body.build_name,
    phone_no: req.body.phone_no,
    adress: req.body.adress,
    blocknumbers: req.body.blocknumbers
  };
  Build.update({ build_name: req.body.build_name }, blocksData, function(
    err,
    objs
  ) {})
    .then(build => {
 /*      Block.remove()
      .then(objs => {
        res.json(objs);
      })
      .catch(err => {
        res.json({ error: "Personal already exists" });
      }); */
      res.json({ status: build_name + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
});

module.exports = builds;
