const express = require("express");
const stores = express.Router();
const cors = require("cors");
const Store = require("../models/StoreModel");

stores.use(cors());

stores.post("/storesetting", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
    const StoreData = {
      block_name: req.body.block_name,
      storenumber: req.body.storenumber,
      car_numbers:"",
      date: today,
      store_state: "Boş",
      store_email: "",
      store_name: "",
      store_surname: "",
      store_phoneno: "",
      style_box: "small-box bg-danger",
    };
    Store.create(StoreData)
    .then((store) => {
      res.json({ status: store.block_name + "Registered!" });
      res.json({ message: "false" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
stores.put("/storesupdate", (req, res) => {
  const storeData = {
    storenumber: req.body.storenumber,
    store_state:req.body.store_state,
    store_name:req.body.store_name,
    store_surname:req.body.store_surname,
    store_phoneno:req.body.store_phoneno,
    style_box:req.body.style_box,
    store_email:req.body.store_email,
    car_numbers:req.body.car_numbers

  };
  Store.update(
    { storenumber: req.body.title_name },
    storeData,
    function (err, objs) {}
  )
    .then((apartmen) => {
      res.json({ status: stores.storenumber  + "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
//dükkan adı kontrol
stores.post("/findstore", (req, res) => {
  Store.findOne({
    storenumber: req.body.storenumber,
  }).then((store) => {
    if (!store) {
      res.send("true");
    } else {
      res.send("false");
    }
  });
});
//dükkan aidat içinkontrol
stores.get("/findstoredues", (req, res) => {
  Store.find({
  })    .then((store) => {
    if (store) {
      res.json(store);
    } else {
      res.json({ error: "Store already exists" });
    }
  })
  .catch((err) => {
    res.send("error: " + err);
  });
});
//dükkan listeleme 
stores.post("/storelist", (req, res) => {
    Store.find({ block_name:req.body.block_name }, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({storenumber:1}) //Alfabeye göre sıralama
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

stores.post("/storesdelete", (req, res) => {
  Store.remove({ block_name: req.body.block_name })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Store already exists" });
    });
});
module.exports = stores;