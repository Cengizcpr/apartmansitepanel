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
stores.post("/storesdelete", (req, res) => {
  Store.remove({ block_name: req.body.block_name })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Store already exists" });
    });
});
stores.post("/storelist", (req, res) => {
  Store.find({ block_name: req.body.block_name }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort() //Alfabeye göre sıralama
    .then((build) => {
      if (build) {
        res.json(build);
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
/* stores.put("/apartmensupdate", (req, res) => {
  const blocksData = {
    circlenumber: req.body.circlenumber,
    host_state:req.body.host_state,
    host_name:req.body.host_name,
    host_surname:req.body.host_surname,
    host_phoneno:req.body.host_phoneno,
    style_box:req.body.style_box,
    host_email:req.body.host_email
    
  };
  Store.update({ circlenumber: req.body.circlenumber }, blocksData, function(
    err,
    objs
  ) {})
    .then(stores => {
      res.json({ status: stores.circlenumber + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
})*/
/* stores.post("/storelist", (req, res) => {
    Store.find({ block_name:req.body.block_name }, function(err, objs) {
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
 */
/* personals.post("/personaldelete", (req, res) => {
  Personal.deleteOne({ phone_no: req.body.phone_no })
    .then(objs => {
      res.json(objs);
    })
    .catch(err => {
      res.json({ error: "Personal already exists" });
    });
}); */
module.exports = stores;
