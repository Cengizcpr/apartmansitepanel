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
    fault_locations: req.body.fault_locations,
    fault_name: req.body.fault_name,
    fault_type: req.body.fault_type,
    fault_priority: req.body.fault_priority,
    fault_comment: req.body.fault_comment,
    fault_state:"Arıza Bildirildi",
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
      res.json({ error: "Admin already exists" });
    }
  })
  .catch((err) => {
    res.send("error: " + err);
  });
});
module.exports = faults;
