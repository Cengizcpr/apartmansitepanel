const express = require("express");
const duesloan = express.Router();
const cors = require("cors");
const DuesLoan = require("../models/DuesLoanModel");
duesloan.use(cors());

process.env.SECRET_KEY = "secret";


duesloan.post("/duesloanadd", (req, res) => {
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
    duesYear:req.body.duesYear,
    duesGroup: req.body.duesGroup,
    amount: req.body.amount,
    payment_date: today,
    loanPersonName: req.body.loanPersonName,
    loanPersonPhoneno:req.body.loanPersonPhoneno,
    loanGroupName:req.body.loanGroupName,
    loanState:req.body.loanState
  };
  console.log(duesData)
  DuesLoan.findOne({
    duesYearMonth: req.body.duesYearMonth
  })
    .then(dues => {
      if (!dues) {
       
      console.log(duesData)
      
        DuesLoan.create(duesData)
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
/*  //aidat ödeme için liste
duesloan.get("/duesloanlist", (req, res) => {
  DuesLoan.find({
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
}); */

//daire aidat içinkontrol
duesloan.post("/finddues", (req, res) => {
  DuesLoan.find({
    loanPersonName: req.body.loanPersonName,
  }).then((dues) => {
    if (dues) {
    
      res.json(dues)
    } else {
     res.send("false")
      
    }
  });
});/*
dues.post("/duesdelete", (req, res) => {
  Dues.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "dues already exists" });
    });
}); */
duesloan.post("/duesloandelete", (req, res) => {
  DuesLoan.deleteMany({ duesYearMonth: req.body.duesYearMonth })
    .then((objs) => {

      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "dues already exists" });
    });
});
module.exports = duesloan;
