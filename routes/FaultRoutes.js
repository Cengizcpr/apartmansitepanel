const express = require("express");
const faults = express.Router();
const cors = require("cors");
const Fault = require("../models/FaultModel");

faults.use(cors());
faults.post("/faultregister", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const faultData = {
    fault_owner: req.body.fault_owner,
    fault_email:req.body.fault_email,
    fault_locations: req.body.fault_locations,
    fault_name: req.body.fault_name,
    fault_type: req.body.fault_type,
    fault_priority: req.body.fault_priority,
    fault_comment: req.body.fault_comment,
    fault_state:"Bekleniyor",
    fault_style:"alert alert-danger alert-dismissible",
    date: today,
  };

  Fault.create(faultData)
    .then((fault) => {
      res.send("true");
    })
    .catch((err) => {
      res.send("false");
    });
});
//arıza için liste
faults.get("/faultlist", (req, res) => {
  Fault.find({
  })    .then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.json({ error: "Fault already exists" });
    }
  })
  .catch((err) => {
    res.send("error: " + err);
  });
});
faults.put("/faultupdate", (req, res) => {
  const faultData = {
    fault_owner: req.body.fault_owner,
    fault_email:req.body.fault_email,
    fault_locations: req.body.fault_locations,
    fault_name: req.body.fault_name,
    fault_type: req.body.fault_type,
    fault_priority: req.body.fault_priority,
    fault_comment: req.body.fault_comment,
    fault_state:req.body.fault_state,
    fault_style:req.body.fault_style

  };

  Fault.update({ _id: req.body._id }, faultData, function(
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
faults.post("/faultdelete", (req, res) => {
  Fault.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "faut already exists" });
    });
});
module.exports = faults;
