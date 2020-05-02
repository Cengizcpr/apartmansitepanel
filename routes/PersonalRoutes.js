const express = require("express");
const personals = express.Router();
const cors = require("cors");
const Personal = require("../models/PersonalModel");

personals.use(cors());

personals.post("/personaladd", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const personalsData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    adress: req.body.adress,
    phone_no: req.body.phone_no,
    departmans: req.body.departmans,
    date: today
  };

  Personal.findOne({
    phone_no: req.body.phone_no
  })
    .then(personals => {
      if (!personals) {
        Personal.create(personalsData)
          .then(personals => {
            res.send("true")
          })
          .catch(err => {
            res.send("false")

          });
      } else {
        res.send("err")      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
personals.get("/personallist", (req, res) => {
  Personal.find({}, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .then(personals => {
      if (personals) {
        res.json(personals);
      } else {
        res.json({ error: "personals already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
personals.post("/personaldelete", (req, res) => {
  Personal.deleteOne({ _id: req.body._id })
    .then(objs => {
      res.json(objs);
    })
    .catch(err => {
      res.json({ error: "Personal already exists" });
    });
});
personals.put("/personalupdate", (req, res) => {
  const personalData = {
  first_name:req.body.first_name,
  last_name:req.body.last_name,
  adress:req.body.adress,
  phone_no:req.body.phone_no,
  departmans:req.body.departmans,
  _id:req.body._id
  };
  Personal.update(
    { _id: req.body._id },
    personalData,
    function (err, objs) {}
  )
    .then((apartmen) => {
       res.json({ status: personals.first_name + "Updated!" }); 
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
module.exports = personals;
