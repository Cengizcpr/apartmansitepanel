const express = require("express");
const appointment = express.Router();
const cors = require("cors");
const Appointment = require("../models/AppointmentModel");

appointment.use(cors());
appointment.post("/apporegister", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const appoData = {
    name_surname: req.body.name_surname,
    phone_no:req.body.phone_no,
    appo_title: req.body.appo_title,
    appo_subject: req.body.appo_subject,
    appo_comment: req.body.appo_comment,
    appo_state: req.body.appo_state,
    date: today,
  };

  Appointment.create(appoData)
    .then((appointment) => {
      res.send("true");
    })
    .catch((err) => {
      res.send("false");
    });
});
//randevu için liste
appointment.get("/appolist", (req, res) => {
    Appointment.find({
  })    .then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.json({ error: "Appointment already exists" });
    }
  })
  .catch((err) => {
    res.send("error: " + err);
  });
});
appointment.put("/appoupdate", (req, res) => {
  const appoData = {
    name_surname: req.body.name_surname,
    phone_no:req.body.phone_no,
    appo_title: req.body.appo_title,
    appo_subject: req.body.appo_subject,
    appo_comment: req.body.appo_comment,
    appo_state: req.body.appo_state,

  };

  Appointment.update({ _id: req.body._id }, appoData, function(
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
appointment.post("/appodelete", (req, res) => {
    Appointment.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Appointment already exists" });
    });
});
module.exports = appointment;
