const express = require("express");
const dues = express.Router();
const cors = require("cors");
const Dues = require("../models/DuesModel");
dues.use(cors());

process.env.SECRET_KEY = "secret";


dues.post("/duesadd", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const duesData = {
    duesYearMonth: req.body.duesYearMonth,
    duesMonth:req.body.duesMonth,
    duesGroup: req.body.duesGroup,
    amount: req.body.amount,
    payment_date: req.body.payment_date,
    operation_date: req.body.operation_date,
    date: today,
    duesComment: req.body.duesComment,
  };
  Dues.findOne({
    duesYearMonth: req.body.duesYearMonth
  })
    .then(dues => {
      if (!dues) {
       
      
      
        Dues.create(duesData)
        .then((fault) => {
            res.send("true");
          })
          .catch((err) => {
            res.send("false");
          });
      
      } else {
        res.send("false");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
//aidat dönem için liste
dues.get("/dueslist", (req, res) => {
  Dues.find({
  })    .then((dues) => {
    if (dues) {
      res.json(dues);
    } else {
      res.json({ error: "Dues already exists" });
    }
  })
  .catch((err) => {
    res.send("error: " + err);
  });
});

//daire aidat içinkontrol
dues.post("/finddues", (req, res) => {
  Dues.find({
    duesGroup: req.body.duesGroup,
  }).then((dues) => {
    if (dues) {
    
      res.json(dues)
    } else {
     res.send("false")
      
    }
  });
});
dues.post("/duesdelete", (req, res) => {
  Dues.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "dues already exists" });
    });
});
module.exports = dues;
